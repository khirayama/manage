import assert from 'power-assert';

import {
  createTodo,
  completeTodo,
  editTodo,
  deleteTodo,
} from '../../src/scripts/actions/todo-action-creators';
import todoStorage from '../../src/scripts/storages/todo-storage';
import appDispatcher from '../../src/scripts/dispatchers/app-dispatcher';
import { actionTypes as types } from '../../src/scripts/constants/constants';


describe('TodoActionCreators', () => {
  beforeEach(() => {
    todoStorage.drop();
    appDispatcher._listeners = {};
  });

  describe('createTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.CREATE_TODO, (todo) => {
        assert(todo.id !== undefined);
        assert(todo.text === 'Hello World');
        assert(todo.completed === false);
        done();
      });
      createTodo('Hello World');
    });
  });

  describe('editTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.EDIT_TODO, (todo) => {
        assert(todo.id !== undefined);
        assert(todo.text === 'Hello New World');
        assert(todo.completed === false);
        done();
      });
      createTodo('Hello World');

      const todos = todoStorage.all();
      const todo_ = todos[0];

      editTodo(todo_.id, 'Hello New World');
    });
  });

  describe('completeTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.COMPLETE_TODO, (todo) => {
        assert(todo.id !== undefined);
        assert(todo.text === 'Hello World');
        assert(todo.completed === true);
        done();
      });
      createTodo('Hello World');

      const todos = todoStorage.all();
      const todo_ = todos[0];

      completeTodo(todo_.id);
    });
  });

  describe('deleteTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.DELETE_TODO, (id) => {
        assert(id !== undefined);
        done();
      });
      createTodo('Hello World');

      const todos = todoStorage.all();
      const todo_ = todos[0];

      deleteTodo(todo_.id);
    });
  });
});
