'use strict';

const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const {User} = require('../../config/db');
const mailer = require('../helper/mailer');
const messages = require('../helper/messages');
const constants = require('../helper/constants');

const patterns = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,20}$/
};
const secretKey = 'your_secret_key';

const hasValidPassword = newUser => {
  if (newUser.password) {
    if (!newUser.password.match(patterns.password)) {
      return false;
    }
    newUser.password = passwordHash.generate(newUser.password);
  };
  return true;
};

module.exports = {
  create(req, res) {
    const newUser = Object.assign({}, req.body);

    if (!hasValidPassword(newUser)) {
      res.status(400).json({
        message: messages.invalidPassword,
        status: 'error'
      });

      return;
    }

    User.create(newUser)
      .then(user => {
        const token = jwt.sign({id: user.dataValues.id, email: user.email.email}, secretKey);
        const data = {
          host: constants.BACKEND_URL,
          route: constants.ROUTES.ACTIVATION,
          email: user.dataValues.email,
          token: token
        };

        res.status(201).json({
          user: user,
          message: messages.createdUser,
          status: 'success'
        });
        mailer.send(data);
      })
      .catch(error => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(409).json({
            error: error,
            message: messages.uniqueUserError,
            status: 'error'
          });
        } else if (error.name === 'SequelizeValidationError') {
          res.status(400).json({
            error: error,
            message: messages.notValidEmailError,
            status: 'error'
          });
        } else {
          res.status(400).json({
            error: error,
            message: messages.catchedError,
            status: 'error'
          });
        }
      });
  },

  destroy(req, res) {
    User.findById(req.params.id)
    .then(user => {
      user.destroy()
      .then(user => res.status(200).json({
        'message': 'User was successfully deleted!'
      }))
      .catch(error => res.status(400).json({
        'error': error,
        'message': 'Something wrong, please try again!'
      }));
    })
    .catch(error => res.status(404).json({
      'message': 'User is not found!'
    }));
  }

};
