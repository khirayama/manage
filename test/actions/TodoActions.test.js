import { jsdom } from 'jsdom';
global.document = jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

import assert  from 'power-assert';
import { TodoStore } from '../../src/scripts/stores/TodoStore';
import TodoActions  from '../../src/scripts/actions/TodoActions';

let todoStore;

describe('TodoActions', () => {
  beforeEach(() => {
    todoStore = new TodoStore({ localStorage: false });
    TodoActions.create({ text: 'Hello World' });
  });
  describe('create', () => {
    it('when empty', () => {
      let todos = todoStore.get();
      let todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello World');
      assert(todo.completed === false);
    });
  });
  describe('update', () => {
    it('when text', () => {
      let todos = todoStore.get();
      let todo = todos[0];

      TodoActions.update(todo.id, {text: 'Hello New World'});
      todos = todoStore.get();
      todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello New World');
      assert(todo.completed === false);
    });
    it('when completed', () => {
      let todos = todoStore.get();
      let todo = todos[0];

      TodoActions.update(todo.id, {completed: true});
      todos = todoStore.get();
      todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello World');
      assert(todo.completed === true);
    });
    it('when category', () => {
      let todos = todoStore.get();
      let todo = todos[0];

      TodoActions.update(todo.id, {category: 'LATER'});
      todos = todoStore.get();
      todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello World');
      assert(todo.completed === false);
      assert(todo.category === 'LATER');
    });
  });
  describe('destroy', () => {
    it('when head todo', () => {
      let todos = todoStore.get();
      let todo = todos[0];

      TodoActions.destroy(todo.id);
      todos = todoStore.get();

      assert(todos.length === 0);
    });
  });
});
