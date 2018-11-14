'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Profiles', [
      {
        firstName: 'Ivan',
        lastName: 'Yarymovych',
        birthDate: '1994-07-02',
        address: 'Sheptyckogo street, 46',
        city: 'Berezyna',
        country: 'Ukraine',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: 'Nataliia',
        lastName: 'Hudyma',
        birthDate: '1994-05-22',
        address: 'Shevchenka street, 32',
        city: 'Berezyna',
        country: 'Ukraine',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Profiles', null)
};
