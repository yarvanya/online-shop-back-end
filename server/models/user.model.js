'use strict';

const passwordHash = require('password-hash');

module.exports  = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isActivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: models => {
        User.hasOne(models.Profile, {
          foreignKey: 'id',
          onDelete: 'CASCADE',
          hooks: true
        });
      }
    },
    hooks: {
      afterValidate: (user, options) => {
        user.password = passwordHash.generate(user.password);
      },
      beforeCreate: (user, options) => {
        user.createdAt = new Date().getTime();
        user.updatedAt = new Date().getTime();
      },
      beforeUpdate: (user, options) => {
        user.updatedAt = new Date().getTime();
      }
    }
  });
  return User;
};
