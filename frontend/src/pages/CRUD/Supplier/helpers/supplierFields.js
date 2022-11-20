const supplierFields = {
  id: { type: 'id', label: 'ID' },

  code: {
    type: 'string',
    label: 'Code',

    options: [{ value: 'value', label: 'value' }],
  },

  name: {
    type: 'string',
    label: 'Name',

    options: [{ value: 'value', label: 'value' }],
  },

  address1: {
    type: 'string',
    label: 'Address 1',

    options: [{ value: 'value', label: 'value' }],
  },

  address2: {
    type: 'string',
    label: 'Address 2',

    options: [{ value: 'value', label: 'value' }],
  },

  city: {
    type: 'relation_one',
    label: 'City',

    options: [{ value: 'value', label: 'value' }],
  },

  state: {
    type: 'relation_one',
    label: 'State',

    options: [{ value: 'value', label: 'value' }],
  },

  country: {
    type: 'relation_one',
    label: 'Country',

    options: [{ value: 'value', label: 'value' }],
  },

  postcode: {
    type: 'string',
    label: 'Postcode',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default supplierFields;
