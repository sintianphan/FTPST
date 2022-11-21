const db = require('../db/models');
const SalesorderDBApi = require('../db/api/salesorder');

module.exports = class SalesorderService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await SalesorderDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let salesorder = await SalesorderDBApi.findBy(
        {id},
        {transaction},
      );

      if (!salesorder) {
        throw new ValidationError(
          'salesorderNotFound',
        );
      }

      await SalesorderDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return salesorder;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await SalesorderDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

