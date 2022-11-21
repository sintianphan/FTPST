const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const salesorder = sequelize.define(
    'salesorder',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

number: {
        type: DataTypes.TEXT,

      },

date: {
        type: DataTypes.DATE,

      },

ref: {
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

  salesorder.associate = (db) => {

    db.salesorder.belongsToMany(db.salesorderdetails, {
      as: 'orderdetailsID',
      foreignKey: {
        name: 'salesorder_orderdetailsIDId',
      },
      constraints: false,
      through: 'salesorderOrderdetailsIDSalesorderdetails',
    });

    db.salesorder.belongsToMany(db.item, {
      as: 'itemcode',
      foreignKey: {
        name: 'salesorder_itemcodeId',
      },
      constraints: false,
      through: 'salesorderItemcodeItem',
    });

    db.salesorder.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.salesorder.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return salesorder;
};

