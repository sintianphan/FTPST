const db = require('../db/models');
const SupplierDBApi = require('../db/api/supplier');

module.exports = class SupplierService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await SupplierDBApi.create(
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
      let supplier = await SupplierDBApi.findBy(
        {id},
        {transaction},
      );

      if (!supplier) {
        throw new ValidationError(
          'supplierNotFound',
        );
      }

      await SupplierDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return supplier;

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

      await SupplierDBApi.remove(
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

