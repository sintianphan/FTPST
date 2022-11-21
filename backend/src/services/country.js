const db = require('../db/models');
const CountryDBApi = require('../db/api/country');

module.exports = class CountryService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await CountryDBApi.create(
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
      let country = await CountryDBApi.findBy(
        {id},
        {transaction},
      );

      if (!country) {
        throw new ValidationError(
          'countryNotFound',
        );
      }

      await CountryDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return country;

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

      await CountryDBApi.remove(
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

