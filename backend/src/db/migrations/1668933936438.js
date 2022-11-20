module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'supplier',
        'cityId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'city',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier',
        'stateId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'state',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier',
        'countryId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'country',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier',
        'postcode',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('supplier', 'postcode', {
        transaction,
      });

      await queryInterface.removeColumn('supplier', 'countryId', {
        transaction,
      });

      await queryInterface.removeColumn('supplier', 'stateId', { transaction });

      await queryInterface.removeColumn('supplier', 'cityId', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
