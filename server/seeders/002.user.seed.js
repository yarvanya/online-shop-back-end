'use strict';

const passwordHash = require('password-hash');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'ivan11yarymovych@gmail.com',
        password: passwordHash.generate('Qq111'),
        isActivate: true,
        isAdmin: true,
        profileId: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        email: 'hudyma22nataliia@gmail.com',
        password: passwordHash.generate('Ww222'),
        isActivate: true,
        isAdmin: true,
        profileId: 2,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null)
};
