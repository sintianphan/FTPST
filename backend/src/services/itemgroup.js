const db = require('../db/models');
const ItemgroupDBApi = require('../db/api/itemgroup');

module.exports = class ItemgroupService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ItemgroupDBApi.create(
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
      let itemgroup = await ItemgroupDBApi.findBy(
        {id},
        {transaction},
      );

      if (!itemgroup) {
        throw new ValidationError(
          'itemgroupNotFound',
        );
      }

      await ItemgroupDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return itemgroup;

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

      await ItemgroupDBApi.remove(
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

