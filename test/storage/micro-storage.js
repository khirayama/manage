import assert from 'power-assert';

import MicroStorage from '../../src/scripts/storages/micro-storage';


describe('MicroStorage', () => {
  let todoStorage;

  beforeEach(() => {
    class TodoStorage extends MicroStorage {
      constructor(options) {
        super(options);
        this.defaults = {
          text: '',
          completed: false,
        };
      }
    }
    todoStorage = new TodoStorage({ localStorage: false });
  });

  describe('create', () => {
    it('an item', () => {
      todoStorage.create({
        text: 'Hello World',
        completed: false,
      });

      const todos = todoStorage.all();
      const todo = todos[0];

      assert(1 === todos.length);
      assert('Hello World' === todo.text);
      assert(false === todo.completed);
      assert(undefined !== todo.id);
    });
    it('an item with text', () => {
      todoStorage.create({
        text: 'Hello World',
      });

      const todos = todoStorage.all();
      const todo = todos[0];

      assert(1 === todos.length);
      assert('Hello World' === todo.text);
      assert(false === todo.completed);
      assert(undefined !== todo.id);
    });
    it('an item with completed', () => {
      todoStorage.create({
        text: 'Hello World',
        completed: true,
      });

      const todos = todoStorage.all();
      const todo = todos[0];

      assert(1 === todos.length);
      assert('Hello World' === todo.text);
      assert(true === todo.completed);
      assert(undefined !== todo.id);
    });
  });

  describe('update', () => {
    let todos;
    let todo;

    beforeEach(() => {
      todoStorage.create({
        text: 'Hello World',
        completed: true,
      });

      todos = todoStorage.all();
      todo = todos[0];
    });

    it('text', () => {
      todo = todoStorage.update(todo.id, {
        text: 'Hello New World',
      });

      assert('Hello New World' === todo.text);
    });
  });
});
