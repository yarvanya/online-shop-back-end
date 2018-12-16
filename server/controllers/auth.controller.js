'use strict';

const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const {User, Profile} = require('../../config/db');
const messages = require('../helper/messages');
const constants = require('../helper/constants');

const isValidPassword = (password, user) => {
  const verifiedPassword = passwordHash.verify(password, user.password);

  if (user && user.password && verifiedPassword) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user.isActivate) {
        res.status(401).json({
          message: messages.userIsNotActivated,
          status: 'error'
        });
      } else if (!isValidPassword(req.body.password, user)) {
        res.status(401).json({
          message: messages.notValidPassword,
          status: 'error'
        });
      } else {
        res.status(200).json({
          token: jwt.sign({id: user.dataValues.id, email: user.dataValues.email}, 'moco'),
          userId: user.dataValues.id,
          profileId: user.dataValues.profileId,
          status: 'success'
        });
      }
    })
    .catch(error => {
      res.status(401).send({
        error: error,
        message: messages.catchedError,
        status: 'error'
      });
    });
  },

  // does activation of the user (activation)
  activation(req, res) {
    let token = req.params.token;
    let decodedUser;

    try {
      decodedUser = jwt.verify(token, 'moco');
    } catch (err) {
      res.status(498).json({message: messages.linkNotValid});
    }

    User.findOne({where: {id: decodedUser.id}})
      .then(user => {
        if (!user) {
          res.status(404).json({message: messages.notFoundUser});
        } else if (user.isActivate) {
          res.status(418).json({message: messages.alreadyActivated});
        } else {
          Profile.create()
          .then(profile => {
            User.findById(decodedUser.id)
              .then(user => {
                user.update({
                  profileId: profile.dataValues.id,
                  isActivate: true
                });
                res.redirect(`${constants.FRONTEND_URL}/#/login`);
              });
          })
          .catch(error => res.status(400).send(error));
        }
      });
  }
};
