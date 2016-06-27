import assert from 'power-assert';

import { TodoCategoryResource } from '../../src/scripts/resources/todo-category-resource';
import { initialTodoCategoryNames } from '../../src/scripts/constants/constants';


describe('TodoCategoryResource', () => {
  let todoCategoryResource;

  beforeEach(() => {
    todoCategoryResource = new TodoCategoryResource({ localStorage: false });
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
      todoCategoryResource.drop();

      todoCategories = todoCategoryResource.all();

      assert(todoCategories.length === 0);

      todoCategoryResource.init();
      todoCategories = todoCategoryResource.all();
    });

    it('constructor', () => {
      todoCategories = todoCategoryResource.all();
    });
  });

  describe('create', () => {
    it('an item with order', () => {
      todoCategoryResource.drop();

      let todoCategories = todoCategoryResource.all();

      todoCategoryResource.create({
        name: 'Hello World',
        order: todoCategories.length,
      });

      todoCategories = todoCategoryResource.all();

      assert(todoCategories.length === 1);

      assert(todoCategories[0].id !== undefined);
      assert(todoCategories[0].name === 'Hello World');
      assert(todoCategories[0].order === 0);
    });

    it('2 items with order', () => {
      todoCategoryResource.drop();

      let todoCategories = todoCategoryResource.all();

      todoCategoryResource.create({
        name: 'Hello World',
        order: todoCategories.length,
      });

      todoCategories = todoCategoryResource.all();

      todoCategoryResource.create({
        name: 'Hello World 2',
        order: todoCategories.length,
      });

      todoCategories = todoCategoryResource.all();

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
