
const itemFields = {
	id: { type: 'id', label: 'ID' },

    code: { type: 'string', label: 'Code',

    options: [

    { value: 'value', label: 'value' },

]

    },

    name: { type: 'string', label: 'Name',

    options: [

    { value: 'value', label: 'value' },

]

    },

    itemgroup: { type: 'relation_one', label: 'Itemgroup',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default itemFields;
