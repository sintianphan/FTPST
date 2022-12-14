
const salesorderFields = {
	id: { type: 'id', label: 'ID' },

    number: { type: 'string', label: 'Number',

    options: [

    { value: 'value', label: 'value' },

]

    },

    date: { type: 'datetime', label: 'Date',

    options: [

    { value: 'value', label: 'value' },

]

    },

    ref: { type: 'string', label: 'Ref',

    options: [

    { value: 'value', label: 'value' },

]

    },

    orderdetailsID: { type: 'relation_many', label: 'Orderdetails ID',

    options: [

    { value: 'value', label: 'value' },

]

    },

    itemcode: { type: 'relation_many', label: 'Itemcode',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default salesorderFields;
