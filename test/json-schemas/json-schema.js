import assert from 'power-assert';

import { validateByJSONSchema } from '../../src/scripts/json-schemas/json-schema';
import { TODO_RESOURCE_SCHEMA } from '../../src/scripts/json-schemas/todo-resource';
import { TODO_CATEGORY_RESOURCE_SCHEMA } from '../../src/scripts/json-schemas/todo-category-resource';
import { TODO_STORE_SCHEMA } from '../../src/scripts/json-schemas/todo-store';


describe('validateByJSONSchema', () => {
  it('todoResource', () => {
    const result = validateByJSONSchema({
      text: '',
      completed: false,
      categoryId: 'category-id',
      order: 1,
    }, TODO_RESOURCE_SCHEMA);

    assert(result.errors.length === 0);
  });

  it('todoCategoryResource', () => {
    const result = validateByJSONSchema({
      name: '',
      order: 1,
    }, TODO_CATEGORY_RESOURCE_SCHEMA);

    assert(result.errors.length === 0);
  });

  // Store
  it('todoStore', () => {
    const result = validateByJSONSchema({
      text: '',
      completed: false,
      categoryId: 'category-id',
      order: 1,
      schedule: null,
      scheduleText: '',
      isEditing: false,
    }, TODO_STORE_SCHEMA);

    assert(result.errors.length === 0);
  });
});
