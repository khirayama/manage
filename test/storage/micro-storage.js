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
      const todo = {
        text: 'Hello World',
        completed: false,
      };

      todoStorage.create(todo);

      const todos = todoStorage.all();
      const todo_ = todos[0];

      assert(1 === todos.length);
      assert('Hello World' === todo_.text);
      assert(false === todo_.completed);
      assert(undefined !== todo_.id);
    });
    it('an item with text', () => {
      const todo = {
        text: 'Hello World',
      };

      todoStorage.create(todo);

      const todos = todoStorage.all();
      const todo_ = todos[0];

      assert(1 === todos.length);
      assert('Hello World' === todo_.text);
      assert(false === todo_.completed);
      assert(undefined !== todo_.id);
    });
    it('an item with completed', () => {
      const todo = {
        text: 'Hello World',
        completed: true,
      };

      todoStorage.create(todo);

      const todos = todoStorage.all();
      const todo_ = todos[0];

      assert(1 === todos.length);
      assert('Hello World' === todo_.text);
      assert(true === todo_.completed);
      assert(undefined !== todo_.id);
    });
  });
});
