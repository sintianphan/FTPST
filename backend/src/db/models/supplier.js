const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const supplier = sequelize.define(
    'supplier',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      code: {
        type: DataTypes.TEXT,
      },

      name: {
        type: DataTypes.TEXT,
      },

      address1: {
        type: DataTypes.TEXT,
      },

      address2: {
        type: DataTypes.TEXT,
      },

      postcode: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  supplier.associate = (db) => {
    db.supplier.belongsTo(db.city, {
      as: 'city',
      foreignKey: {
        name: 'cityId',
      },
      constraints: false,
    });

    db.supplier.belongsTo(db.state, {
      as: 'state',
      foreignKey: {
        name: 'stateId',
      },
      constraints: false,
    });

    db.supplier.belongsTo(db.country, {
      as: 'country',
      foreignKey: {
        name: 'countryId',
      },
      constraints: false,
    });

    db.supplier.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.supplier.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return supplier;
};
