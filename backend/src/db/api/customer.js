const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CustomerDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer = await db.customer.create(
      {
        id: data.id || undefined,

        code: data.code || null,
        name: data.name || null,
        address1: data.address1 || null,
        address2: data.address2 || null,
        Postcode: data.Postcode || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await customer.setCity(data.city || null, {
      transaction,
    });

    await customer.setState(data.state || null, {
      transaction,
    });

    await customer.setCountry(data.country || null, {
      transaction,
    });

    return customer;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer = await db.customer.findByPk(id, {
      transaction,
    });

    await customer.update(
      {
        code: data.code || null,
        name: data.name || null,
        address1: data.address1 || null,
        address2: data.address2 || null,
        Postcode: data.Postcode || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await customer.setCity(data.city || null, {
      transaction,
    });

    await customer.setState(data.state || null, {
      transaction,
    });

    await customer.setCountry(data.country || null, {
      transaction,
    });

    return customer;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer = await db.customer.findByPk(id, options);

    await customer.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await customer.destroy({
      transaction,
    });

    return customer;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const customer = await db.customer.findOne({ where }, { transaction });

    if (!customer) {
      return customer;
    }

    const output = customer.get({ plain: true });

    output.city = await customer.getCity({
      transaction,
    });

    output.state = await customer.getState({
      transaction,
    });

    output.country = await customer.getCountry({
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
          [Op.and]: Utils.ilike('customer', 'code', filter.code),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customer', 'name', filter.name),
        };
      }

      if (filter.address1) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customer', 'address1', filter.address1),
        };
      }

      if (filter.address2) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customer', 'address2', filter.address2),
        };
      }

      if (filter.Postcode) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customer', 'Postcode', filter.Postcode),
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

    let { rows, count } = await db.customer.findAndCountAll({
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
          Utils.ilike('customer', 'id', query),
        ],
      };
    }

    const records = await db.customer.findAll({
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
