const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const itemgroup = sequelize.define(
    'itemgroup',
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

  itemgroup.associate = (db) => {
    db.itemgroup.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.itemgroup.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return itemgroup;
};
