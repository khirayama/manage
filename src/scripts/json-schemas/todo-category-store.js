export const TODO_CATEGORY_STORE_SCHEMA = {
  type: 'object',
  required: [
    'name',
    'order',
  ],
  properties: {
    name: {
      type: 'string',
    },
    order: {
      type: 'integer',
      minimum: 0,
    },
    isEditing: {
      type: 'boolean',
    },
  },
};

export const TODO_CATEGORIES_STORE_SCHEMA = {
  type: 'array',
  minItems: 0,
  items: TODO_CATEGORY_STORE_SCHEMA,
};
