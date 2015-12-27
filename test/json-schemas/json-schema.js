import assert from 'power-assert';

import { validateByJSONSchema } from '../../src/scripts/json-schemas/json-schema';
import todoStorageSchema from '../../src/scripts/json-schemas/todo-storage';


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
});
