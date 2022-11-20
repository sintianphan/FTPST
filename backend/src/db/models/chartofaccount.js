const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const chartofaccount = sequelize.define(
    'chartofaccount',
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

  chartofaccount.associate = (db) => {
    db.chartofaccount.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.chartofaccount.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return chartofaccount;
};
