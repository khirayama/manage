import assert from 'power-assert';

import TodoCategoryStore from '../../src/scripts/stores/todo-category-store';


describe('TodoCategoryStore', () => {
  let todoCategoryStore;
  let todoCategories;

  beforeEach(() => {
    todoCategoryStore = new TodoCategoryStore();
    todoCategoryStore.create({
      id: 'dummy-id',
      name: 'Hello World',
      order: 1,
    });
  });

  describe('create', () => {
    it('an item', () => {
      todoCategories = todoCategoryStore._todoCategories;

      assert(todoCategories.length === 1);
      assert(todoCategories[0].name === 'Hello World');
    });
  });

  describe('update', () => {
    it('an item', () => {
      todoCategoryStore.update({
        id: 'dummy-id',
        name: 'Hello New World',
      order: 1,
      });

      todoCategories = todoCategoryStore._todoCategories;

      assert(todoCategories.length === 1);
      assert(todoCategories[0].name === 'Hello New World');
    });
  });

  describe('delete', () => {
    it('an item', () => {
      todoCategoryStore.delete('dummy-id');

      todoCategories = todoCategoryStore._todoCategories;

      assert(todoCategories.length === 0);
    });
  });
});
