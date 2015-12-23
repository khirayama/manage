import assert from 'power-assert';

import { TodoStorage } from '../../src/scripts/storages/todo-storage';


describe('TodoStorage', () => {
  let todoStorage;

  beforeEach(() => {
    todoStorage = new TodoStorage({ localStorage: false });
  });

  describe('create', () => {
    it('an item with order', () => {
      let todos = todoStorage.all();

      todoStorage.create({
        text: 'Hello World',
        completed: false,
        order: todos.length,
      });

      todos = todoStorage.all();

      assert(todos.length === 1);

      assert(todos[0].id !== undefined);
      assert(todos[0].text === 'Hello World');
      assert(todos[0].completed === false);
      assert(todos[0].order === 0);
    });

    it('2 items with order', () => {
      let todos = todoStorage.all();

      todoStorage.create({
        text: 'Hello World',
        completed: false,
        order: todos.length,
      });

      todos = todoStorage.all();

      todoStorage.create({
        text: 'Hello World 2',
        completed: false,
        order: todos.length,
      });

      todos = todoStorage.all();

      assert(todos.length === 2);

      assert(todos[0].id !== undefined);
      assert(todos[0].text === 'Hello World');
      assert(todos[0].completed === false);
      assert(todos[0].order === 0);

      assert(todos[1].id !== undefined);
      assert(todos[1].text === 'Hello World 2');
      assert(todos[1].completed === false);
      assert(todos[1].order === 1);
    });
  });
});
