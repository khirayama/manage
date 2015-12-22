import assert from 'power-assert';

import {
  createTodo,
  completeTodo,
  editTodo,
  deleteTodo,
} from '../../src/scripts/actions/todo-action-creators';
import appDispatcher from '../../src/scripts/dispatchers/app-dispatcher';
import { actionTypes as types } from '../../src/scripts/constants/constants';


describe('TodoActionCreators', () => {
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
});
