const db = require('../db/models');
const StateDBApi = require('../db/api/state');

module.exports = class StateService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await StateDBApi.create(data, {
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
      let state = await StateDBApi.findBy({ id }, { transaction });

      if (!state) {
        throw new ValidationError('stateNotFound');
      }

      await StateDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return state;
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

      await StateDBApi.remove(id, {
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
