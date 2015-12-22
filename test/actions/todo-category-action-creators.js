import assert from 'power-assert';

import {
  createTodoCategory,
  editTodoCategory,
  deleteTodoCategory,
} from '../../src/scripts/actions/todo-category-action-creators';
import todoCategoryStorage from '../../src/scripts/storages/todo-category-storage';
import appDispatcher from '../../src/scripts/dispatchers/app-dispatcher';
import { actionTypes as types } from '../../src/scripts/constants/constants';


describe('TodoCategoryActionCreators', () => {
  beforeEach(() => {
    todoCategoryStorage.drop();
    appDispatcher._listeners = {};
  });

  describe('createTodoCategory', () => {
    it('an item', (done) => {
      appDispatcher.on(types.CREATE_TODO_CATEGORY, (todoCategory) => {
        assert(todoCategory.id !== undefined);
        assert(todoCategory.name === 'Hello World');
        assert(todoCategory.order === 0);
        done();
      });
      createTodoCategory('Hello World');
    });
  });

  describe('editTodoCategory', () => {
    it('an item', (done) => {
      appDispatcher.on(types.EDIT_TODO_CATEGORY, (todoCategory) => {
        assert(todoCategory.id !== undefined);
        assert(todoCategory.name === 'Hello New World');
        assert(todoCategory.order === 0);
        done();
      });
      createTodoCategory('Hello World');

      const todoCategories = todoCategoryStorage.all();
      const todoCategory = todoCategories[0];

      editTodoCategory(todoCategory.id, 'Hello New World');
    });
  });

  describe('deleteTodoCategory', () => {
    it('an item', (done) => {
      appDispatcher.on(types.DELETE_TODO_CATEGORY, (todoCategory) => {
        assert(todoCategory.id !== undefined);
        done();
      });
      createTodoCategory('Hello World');

      const todoCategories = todoCategoryStorage.all();
      const todoCategory = todoCategories[0];

      deleteTodoCategory(todoCategory.id);
    });
  });
});

