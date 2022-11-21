const db = require('../db/models');
const ItemDBApi = require('../db/api/item');

module.exports = class ItemService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ItemDBApi.create(
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
      let item = await ItemDBApi.findBy(
        {id},
        {transaction},
      );

      if (!item) {
        throw new ValidationError(
          'itemNotFound',
        );
      }

      await ItemDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return item;

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

      await ItemDBApi.remove(
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

