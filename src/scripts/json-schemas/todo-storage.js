export const TODO_STORAGE_SCHEMA = {
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
    }
  }
};

export const TODOS_STORAGE_SCHEMA = {
  type: 'array',
  minItems: 0,
  items: {
    required: [
      'categoryId',
      'categoryName',
      'otherCategories',
      'todos',
    ],
    properties: {
      categoryId: {
        type: 'string',
      },
      categoryName: {
        type: 'string',
      },
      // otherCategories: TODO_CATEGORIES_STORAGE_SCHEMA,
      todos: {
        type: 'array',
        minItems: 0,
        items: TODO_STORAGE_SCHEMA,
      }
    }
  }
};
