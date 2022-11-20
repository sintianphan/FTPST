const db = require('../db/models');
const ServiceDBApi = require('../db/api/service');

module.exports = class ServiceService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ServiceDBApi.create(data, {
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
      let service = await ServiceDBApi.findBy({ id }, { transaction });

      if (!service) {
        throw new ValidationError('serviceNotFound');
      }

      await ServiceDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return service;
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

      await ServiceDBApi.remove(id, {
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
