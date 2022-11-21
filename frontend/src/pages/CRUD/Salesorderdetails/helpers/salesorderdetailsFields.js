
const salesorderdetailsFields = {
	id: { type: 'id', label: 'ID' },

    item: { type: 'relation_one', label: 'Item',

    options: [

    { value: 'value', label: 'value' },

]

    },

    description: { type: 'relation_one', label: 'Description',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default salesorderdetailsFields;
