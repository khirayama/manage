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
        done();
      });
      createTodo('Hello World');

      let todos = todoStorage.all();
      let todo_ = todos[0];

      editTodo(todo_.id, 'Hello New World');
    });
  });
});
