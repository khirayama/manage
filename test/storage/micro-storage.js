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

  describe('get', () => {
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
      todo = todoStorage.get(todo.id);

      assert(todo.text === 'Hello World');
      assert(todo.completed === true);
    });
  });

  describe('all', () => {
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

      todos = todoStorage.all();
      todo = todos[0];
    });

    it('all item', () => {
      assert(todos.length === 2);
    });
  });

  describe('where', () => {
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
        completed: false,
      });
    });

    it('text', () => {
      todos = todoStorage.where({ text: 'Hello World' }).get();

      assert(todos.length === 1);
      assert(todos[0].text === 'Hello World');
    });

    it('bool', () => {
      todos = todoStorage.where({ completed: true }).get();

      assert(todos.length === 2);
      assert(todos[0].text === 'Hello World');
      assert(todos[1].text === 'Hello World 2');
    });
  });

  describe('order', () => {
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
        completed: false,
      });
    });

    describe('text', () => {
      it('normal', () => {
        todos = todoStorage.order('text').get();

        assert(todos.length === 3);
        assert(todos[0].text === 'Hello World');
        assert(todos[1].text === 'Hello World 2');
        assert(todos[2].text === 'Hello World 3');
      });

      it('reserse', () => {
        todos = todoStorage.order('text', true).get();

        assert(todos.length === 3);
        assert(todos[0].text === 'Hello World 3');
        assert(todos[1].text === 'Hello World 2');
        assert(todos[2].text === 'Hello World');
      });
    });

    describe('bool', () => {
      it('normal', () => {
        todos = todoStorage.order('completed').get();

        assert(todos.length === 3);
        assert(todos[0].text === 'Hello World 3');
        assert(todos[1].text === 'Hello World');
        assert(todos[2].text === 'Hello World 2');
      });

      it('reserse', () => {
        todos = todoStorage.order('completed', true).get();

        assert(todos.length === 3);
        assert(todos[0].text === 'Hello World');
        assert(todos[1].text === 'Hello World 2');
        assert(todos[2].text === 'Hello World 3');
      });
    });
  });

  describe('limit', () => {
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
        completed: false,
      });
    });

    it('top 2', () => {
      todos = todoStorage.limit(2).get();

      assert(todos.length === 2);
      assert(todos[0].text === 'Hello World');
      assert(todos[1].text === 'Hello World 2');
    });
  });
});
