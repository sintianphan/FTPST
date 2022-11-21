const db = require('../db/models');
const CustomerDBApi = require('../db/api/customer');

module.exports = class CustomerService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await CustomerDBApi.create(
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
      let customer = await CustomerDBApi.findBy(
        {id},
        {transaction},
      );

      if (!customer) {
        throw new ValidationError(
          'customerNotFound',
        );
      }

      await CustomerDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return customer;

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

      await CustomerDBApi.remove(
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

