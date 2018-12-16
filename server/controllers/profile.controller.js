'use strict';

const {Profile} = require('../../config/db');
const messages = require('../helper/messages');
const constants = require('../helper/constants');

module.exports = {
  get(req, res) {
    Profile.findById(req.params.id)
    .then(profile => {
      if (profile) {
        res.status(200).send(profile);
      } else {
        res.status(404).json({
          message: messages.notFoundUser,
          status: 'error'
        });
      }
    })
    .catch(error => {
      res.status(400).send({
        error: error,
        message: messages.catchedError,
        status: 'error'
      });
    });
  },

  update(req, res) {
    Profile.findById(req.params.id)
    .then(profile => {
      if (profile) {
        profile.updateAttributes(Object.assign({}, req.body))
          .then(profile => res.status(200).json({
            profile: profile,
            message: messages.profileUpdated,
            status: 'success'
          }))
          .catch(error => res.status(400).send({
            error: error,
            message: messages.profileNotUpdated,
            status: 'error'
          }));
      } else {
        res.status(404).json({
          message: messages.notFoundProfile,
          status: 'error'
        });
      }
    })
    .catch(error => {
      res.status(400).send({
        error: error,
        status: 'error'
      });
    });
  }
};
