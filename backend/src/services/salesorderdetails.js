const db = require('../db/models');
const SalesorderdetailsDBApi = require('../db/api/salesorderdetails');

module.exports = class SalesorderdetailsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await SalesorderdetailsDBApi.create(
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
      let salesorderdetails = await SalesorderdetailsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!salesorderdetails) {
        throw new ValidationError(
          'salesorderdetailsNotFound',
        );
      }

      await SalesorderdetailsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return salesorderdetails;

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

      await SalesorderdetailsDBApi.remove(
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

