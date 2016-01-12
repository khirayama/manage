import assert from 'power-assert';

import {
  createTodoCategory,
  editTodoCategory,
  updateTodoCategory,
  deleteTodoCategory,
  sortTodoCategories,
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
        assert(todoCategory.isEditing === true);
        assert(todoCategory.order === 0);
        done();
      });
      createTodoCategory('Hello World');
    });
  });

  describe('editTodoCategory', () => {
    it('an item', (done) => {
      appDispatcher.on(types.UPDATE_TODO_CATEGORY, (todoCategoryId) => {
        assert(todoCategoryId !== undefined);
        done();
      });
      createTodoCategory('Hello World');

      const todoCategories = todoCategoryStorage.all();
      const todoCategory = todoCategories[0];

      editTodoCategory(todoCategory.order);
    });
  });

  describe('updateTodoCategory', () => {
    it('an item', (done) => {
      appDispatcher.on(types.UPDATE_TODO_CATEGORY, (todoCategory) => {
        assert(todoCategory.id !== undefined);
        assert(todoCategory.name === 'Hello New World');
        assert(todoCategory.isEditing === false);
        assert(todoCategory.order === 0);
        done();
      });
      createTodoCategory('Hello World');

      const todoCategories = todoCategoryStorage.all();
      const todoCategory = todoCategories[0];

      updateTodoCategory(todoCategory.id, 'Hello New World');
    });
  });

  describe('deleteTodoCategory', () => {
    it('an item', (done) => {
      appDispatcher.on(types.GET_ALL_TODO_CATEGORIES, (todoCategories) => {
        assert(todoCategories.length === 0);
        done();
      });
      createTodoCategory('Hello World');

      const todoCategories = todoCategoryStorage.all();
      const todoCategory = todoCategories[0];

      deleteTodoCategory(todoCategory.id);
    });
  });

  describe('sortTodoCategory', () => {
    it('from < to', (done) => {
      appDispatcher.on(types.GET_ALL_TODO_CATEGORIES, (todoCategories) => {
        assert(todoCategories.length === 3);
        assert(todoCategories[0].name === 'Hello World 1');
        assert(todoCategories[1].name === 'Hello World 0');
        done();
      });
      createTodoCategory('Hello World 0');
      createTodoCategory('Hello World 1');
      createTodoCategory('Hello World 2');
      sortTodoCategories(0, 1);
    });
    it('to < from', (done) => {
      appDispatcher.on(types.GET_ALL_TODO_CATEGORIES, (todoCategories) => {
        assert(todoCategories.length === 3);
        assert(todoCategories[0].name === 'Hello World 1');
        assert(todoCategories[1].name === 'Hello World 0');
        done();
      });
      createTodoCategory('Hello World 0');
      createTodoCategory('Hello World 1');
      createTodoCategory('Hello World 2');
      sortTodoCategories(1, 0);
    });
  });
});

