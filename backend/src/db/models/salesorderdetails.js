const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const salesorderdetails = sequelize.define(
    'salesorderdetails',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  salesorderdetails.associate = (db) => {

    db.salesorderdetails.belongsTo(db.item, {
      as: 'item',
      foreignKey: {
        name: 'itemId',
      },
      constraints: false,
    });

    db.salesorderdetails.belongsTo(db.item, {
      as: 'description',
      foreignKey: {
        name: 'descriptionId',
      },
      constraints: false,
    });

    db.salesorderdetails.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.salesorderdetails.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return salesorderdetails;
};

