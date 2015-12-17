import assert from 'power-assert';

console.log(assert);

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

    it('all', () => {
      todo = todoStorage.update(todo.id, {
        text: 'Hello New World',
        completed: true,
      });

      assert(todo.text === 'Hello New World');
      assert(todo.completed === true);
    });

    it('text', () => {
      todo = todoStorage.update(todo.id, {
        text: 'Hello New World',
      });

      assert(todo.text === 'Hello New World');
    });
  });

  describe('destroy', () => {
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

    it('an item', () => {
      todoStorage.destroy(todo.id);

      todos = todoStorage.all();
      assert(todos.length === 0);
    });
  });

  describe('drop', () => {
    let todos;
    let todo;

    beforeEach(() => {
      todoStorage.create({
        text: 'Hello World',
        completed: true,
      });
      todoStorage.create({
        text: 'Hello World 2',
        completed: true,
      });
      todoStorage.create({
        text: 'Hello World 3',
        completed: true,
      });

      todos = todoStorage.all();
      todo = todos[0];
    });

    it('all item', () => {
      assert(todos.length === 3);

      todoStorage.drop();

      todos = todoStorage.all();
      assert(todos.length === 0);
    });
  });
});
