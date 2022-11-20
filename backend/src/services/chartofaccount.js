const db = require('../db/models');
const ChartofaccountDBApi = require('../db/api/chartofaccount');

module.exports = class ChartofaccountService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ChartofaccountDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let chartofaccount = await ChartofaccountDBApi.findBy(
        { id },
        { transaction },
      );

      if (!chartofaccount) {
        throw new ValidationError('chartofaccountNotFound');
      }

      await ChartofaccountDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return chartofaccount;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await ChartofaccountDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
