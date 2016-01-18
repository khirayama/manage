export const TODO_CATEGORY_STORE_SCHEMA = {
  type: 'object',
  required: [
    'name',
    'order',
    'numberOfTodos',
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
    numberOfTodos: {
      type: 'integer',
      minimum: 0,
    },
  },
};

export const TODO_CATEGORIES_STORE_SCHEMA = {
  type: 'array',
  minItems: 0,
  items: TODO_CATEGORY_STORE_SCHEMA,
};
