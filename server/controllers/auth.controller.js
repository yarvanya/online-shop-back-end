'use strict';

const jwt = require('jsonwebtoken');
const {User, Profile} = require('../../config/db');
const messages = require('../helper/messages');
const constants = require('../helper/constants');

module.exports = {
    // does activation of the user (activation)
    activation(req, res) {
      let token = req.params.token;
      let decodedUser;
      try {
        decodedUser = jwt.verify(token, 'unicef');
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
                  res.redirect(constants.FRONTEND_URL);
                });
            })
            .catch(error => res.status(400).send(error));
          }
        });
    }
};
