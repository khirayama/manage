export const TODO_RESOURCE_SCHEMA = {
  type: 'object',
  required: [
    'text',
    'completed',
    'categoryId',
    'order',
  ],
  properties: {
    text: {
      type: 'string',
    },
    completed: {
      type: 'boolean',
    },
    categoryId: {
      type: 'string',
    },
    order: {
      type: 'integer',
      minimum: 0,
    },
  },
};

export const TODOS_RESOURCE_SCHEMA = {
  type: 'array',
  minItems: 0,
  items: {
    required: [
      'categoryId',
      'categoryName',
      'tasks',
    ],
    properties: {
      categoryId: {
        type: 'string',
      },
      categoryName: {
        type: 'string',
      },
      tasks: {
        type: 'array',
        minItems: 0,
        items: TODO_RESOURCE_SCHEMA,
      },
    },
  },
};
