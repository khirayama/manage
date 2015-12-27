import assert from 'power-assert';

import { validateByJSONSchema } from '../../src/scripts/json-schemas/json-schema';
import todoStorageSchema from '../../src/scripts/json-schemas/todo-storage';
import todoCategoryStorageSchema from '../../src/scripts/json-schemas/todo-category-storage';


describe('validateByJSONSchema', () => {
  it('todoStorage', () => {
    const result = validateByJSONSchema({
      text: '',
      completed: false,
      categoryId: 'category-id',
      order: 1,
    }, todoStorageSchema);

    assert(result.errors.length === 0);
  });

  it('todoCategoryStorageStorage', () => {
    const result = validateByJSONSchema({
      name: '',
      order: 1,
    }, todoCategoryStorageSchema);

    assert(result.errors.length === 0);
  });
});
