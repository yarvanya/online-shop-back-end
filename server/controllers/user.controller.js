'use strict';

const passwordHash = require('password-hash');
const {User} = require('../../config/db');

const patterns = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,20}$/
};

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
        'message': 'Invalid password. Try again!',
        'status': 'error'
      });

      return;
    }

    User.create(newUser)
      .then(user => res.status(201).json({
          'user': user,
          'message': 'User was successfully created!',
          'status': 'success'
      }))
      .catch(error => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(409).json({
            'error': error,
            'message': 'User with this email is already registered! Please, try again with another email!',
            'status': 'error'
          });
        } else if (error.name === 'SequelizeValidationError') {
          res.status(400).json({
            'error': error,
            'message': 'This email is not valid! Please write your origin email!',
            'status': 'error'
          });
        } else {
          res.status(400).json({
            'error': error,
            'message': 'Something wrong, please try again!',
            'status': 'error'
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
