import { jsdom } from 'jsdom';
global.document = jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

import assert  from 'power-assert';
import TodoStore  from '../../src/scripts/stores/TodoStore';
import TodoActionCreators  from '../../src/scripts/actions/TodoActionCreators';

describe('TodoActionCreators', () => {
  beforeEach(() => {
    // FIXME: remove past state.
    TodoStore._data = {};
    TodoActionCreators.create({text: 'Hello World'});
  });
  describe('create', () => {
    it('when empty', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello World');
      assert(todo.completed === false);
    });
  });
  describe('update', () => {
    it('when text', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      TodoActionCreators.update(todo.id, {text: 'Hello New World'});
      todos = TodoStore.get();
      todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello New World');
      assert(todo.completed === false);
    });
    it('when completed', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      TodoActionCreators.update(todo.id, {completed: true});
      todos = TodoStore.get();
      todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello World');
      assert(todo.completed === true);
    });
    it('when category', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      TodoActionCreators.update(todo.id, {category: 'LATER'});
      todos = TodoStore.get();
      todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello World');
      assert(todo.completed === false);
      assert(todo.category === 'LATER');
    });
  });
  describe('destroy', () => {
    it('when head todo', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      TodoActionCreators.destroy(todo.id);
      todos = TodoStore.get();

      assert(todos.length === 0);
    });
  });
});
