import assert from 'power-assert';

import { TodoCategoryStorage } from '../../src/scripts/storages/todo-category-storage';
import { initialTodoCategoryNames } from '../../src/scripts/constants/constants';


describe('TodoCategoryStorage', () => {
  let todoCategoryStorage;

  beforeEach(() => {
    todoCategoryStorage = new TodoCategoryStorage({ localStorage: false });
  });

  describe('init', () => {
    let todoCategories;
    afterEach(() => {
      assert(todoCategories.length === 3);
      assert(todoCategories[0].name === initialTodoCategoryNames.TODAY);
      assert(todoCategories[0].order === 0);

      assert(todoCategories[1].name === initialTodoCategoryNames.LATER);
      assert(todoCategories[1].order === 1);

      assert(todoCategories[2].name === initialTodoCategoryNames.SCHEDULE);
      assert(todoCategories[2].order === 2);
    });

    it('init', () => {
      todoCategoryStorage.drop();

      todoCategories = todoCategoryStorage.all();

      assert(todoCategories.length === 0);

      todoCategoryStorage.init();
      todoCategories = todoCategoryStorage.all();
    });

    it('constructor', () => {
      todoCategories = todoCategoryStorage.all();
    });
  });

  describe('create', () => {
    it('an item with order', () => {
      todoCategoryStorage.drop();

      let todoCategories = todoCategoryStorage.all();

      todoCategoryStorage.create({
        name: 'Hello World',
        order: todoCategories.length,
      });

      todoCategories = todoCategoryStorage.all();

      assert(todoCategories.length === 1);

      assert(todoCategories[0].id !== undefined);
      assert(todoCategories[0].name === 'Hello World');
      assert(todoCategories[0].order === 0);
    });

    it('2 items with order', () => {
      todoCategoryStorage.drop();

      let todoCategories = todoCategoryStorage.all();

      todoCategoryStorage.create({
        name: 'Hello World',
        order: todoCategories.length,
      });

      todoCategories = todoCategoryStorage.all();

      todoCategoryStorage.create({
        name: 'Hello World 2',
        order: todoCategories.length,
      });

      todoCategories = todoCategoryStorage.all();

      assert(todoCategories.length === 2);

      assert(todoCategories[0].id !== undefined);
      assert(todoCategories[0].name === 'Hello World');
      assert(todoCategories[0].order === 0);

      assert(todoCategories[1].id !== undefined);
      assert(todoCategories[1].name === 'Hello World 2');
      assert(todoCategories[1].order === 1);
    });
  });
});
