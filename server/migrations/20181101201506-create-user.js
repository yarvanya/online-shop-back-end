'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      isActivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.BIGINT,
        allowNull: true
      }
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Users')
};
