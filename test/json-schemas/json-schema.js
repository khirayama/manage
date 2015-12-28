import assert from 'power-assert';

import { validateByJSONSchema } from '../../src/scripts/json-schemas/json-schema';
import todoStorageSchema from '../../src/scripts/json-schemas/todo-storage';
import todoCategoryStorageSchema from '../../src/scripts/json-schemas/todo-category-storage';
import todoStoreSchema from '../../src/scripts/json-schemas/todo-store';
import todoCategoryStoreSchema from '../../src/scripts/json-schemas/todo-category-store';


describe('validateByJSONSchema', () => {
  // Storage
  it('todoStorage', () => {
    const result = validateByJSONSchema({
      text: '',
      completed: false,
      categoryId: 'category-id',
      order: 1,
    }, todoStorageSchema);

    assert(result.errors.length === 0);
  });

  it('todoCategoryStorage', () => {
    const result = validateByJSONSchema({
      name: '',
      order: 1,
    }, todoCategoryStorageSchema);

    assert(result.errors.length === 0);
  });

  // Store
  it('todoStore', () => {
    const result = validateByJSONSchema({
      text: '',
      completed: false,
      categoryId: 'category-id',
      order: 1,
      isEditing: false,
    }, todoStoreSchema);

    assert(result.errors.length === 0);
  });

  it('todoCategoryStore', () => {
    const result = validateByJSONSchema({
      name: '',
      order: 1,
      isEditing: false,
    }, todoCategoryStorageSchema);

    assert(result.errors.length === 0);
  });
});
