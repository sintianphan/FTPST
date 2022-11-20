const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SupplierDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier = await db.supplier.create(
      {
        id: data.id || undefined,

        code: data.code || null,
        name: data.name || null,
        address1: data.address1 || null,
        address2: data.address2 || null,
        postcode: data.postcode || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await supplier.setCity(data.city || null, {
      transaction,
    });

    await supplier.setState(data.state || null, {
      transaction,
    });

    await supplier.setCountry(data.country || null, {
      transaction,
    });

    return supplier;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier = await db.supplier.findByPk(id, {
      transaction,
    });

    await supplier.update(
      {
        code: data.code || null,
        name: data.name || null,
        address1: data.address1 || null,
        address2: data.address2 || null,
        postcode: data.postcode || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await supplier.setCity(data.city || null, {
      transaction,
    });

    await supplier.setState(data.state || null, {
      transaction,
    });

    await supplier.setCountry(data.country || null, {
      transaction,
    });

    return supplier;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier = await db.supplier.findByPk(id, options);

    await supplier.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await supplier.destroy({
      transaction,
    });

    return supplier;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const supplier = await db.supplier.findOne({ where }, { transaction });

    if (!supplier) {
      return supplier;
    }

    const output = supplier.get({ plain: true });

    output.city = await supplier.getCity({
      transaction,
    });

    output.state = await supplier.getState({
      transaction,
    });

    output.country = await supplier.getCountry({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.city,
        as: 'city',
      },

      {
        model: db.state,
        as: 'state',
      },

      {
        model: db.country,
        as: 'country',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.code) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('supplier', 'code', filter.code),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('supplier', 'name', filter.name),
        };
      }

      if (filter.address1) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('supplier', 'address1', filter.address1),
        };
      }

      if (filter.address2) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('supplier', 'address2', filter.address2),
        };
      }

      if (filter.postcode) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('supplier', 'postcode', filter.postcode),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.city) {
        var listItems = filter.city.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          cityId: { [Op.or]: listItems },
        };
      }

      if (filter.state) {
        var listItems = filter.state.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          stateId: { [Op.or]: listItems },
        };
      }

      if (filter.country) {
        var listItems = filter.country.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          countryId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await db.supplier.findAndCountAll({
      where,
      include,
      distinct: true,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction,
    });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('supplier', 'id', query),
        ],
      };
    }

    const records = await db.supplier.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
