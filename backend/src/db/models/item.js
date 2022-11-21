const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const item = sequelize.define(
    'item',
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

  item.associate = (db) => {

    db.item.belongsTo(db.itemgroup, {
      as: 'itemgroup',
      foreignKey: {
        name: 'itemgroupId',
      },
      constraints: false,
    });

    db.item.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.item.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return item;
};

