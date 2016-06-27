export const TASK_CATEGORY_RESOURCE_SCHEMA = {
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
  },
};

export const TASK_CATEGORIES_RESOURCE_SCHEMA = {
  type: 'array',
  minItems: 0,
  items: TASK_CATEGORY_RESOURCE_SCHEMA,
};
