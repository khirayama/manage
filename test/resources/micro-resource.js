import assert from 'power-assert';
import MicroResource from '../../src/scripts/resources/micro-resource';


describe('MicroResource', () => {
  let todoResource;

  beforeEach(() => {
    class TodoResource extends MicroResource {
      constructor(options) {
        super(options);
        this.defaults = {
          text: '',
          completed: false,
        };
      }
    }
    todoResource = new TodoResource({ localStorage: false });
  });

  describe('create', () => {
    it('an item', () => {
      todoResource.create({
        text: 'Hello World',
        completed: false,
      });

      const todos = todoResource.all();
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
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });

      todos = todoResource.all();
      todo = todos[0];
    });

    it('all', () => {
      todo = todoResource.update(todo.id, {
        text: 'Hello New World',
        completed: true,
      });

      assert(todo.text === 'Hello New World');
      assert(todo.completed === true);
    });

    it('text', () => {
      todo = todoResource.update(todo.id, {
        text: 'Hello New World',
      });

      assert(todo.text === 'Hello New World');
    });
  });

  describe('destroy', () => {
    let todos;
    let todo;

    beforeEach(() => {
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });

      todos = todoResource.all();
      todo = todos[0];
    });

    it('an item', () => {
      todoResource.destroy(todo.id);

      todos = todoResource.all();
      assert(todos.length === 0);
    });
  });

  describe('drop', () => {
    let todos;
    let todo;

    beforeEach(() => {
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });
      todoResource.create({
        text: 'Hello World 2',
        completed: true,
      });
      todoResource.create({
        text: 'Hello World 3',
        completed: true,
      });

      todos = todoResource.all();
      todo = todos[0];
    });

    it('all item', () => {
      assert(todos.length === 3);

      todoResource.drop();

      todos = todoResource.all();
      assert(todos.length === 0);
    });
  });

  describe('get', () => {
    let todos;
    let todo;

    beforeEach(() => {
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });

      todos = todoResource.all();
      todo = todos[0];
    });

    it('an item', () => {
      todo = todoResource.get(todo.id);

      assert(todo.text === 'Hello World');
      assert(todo.completed === true);
    });
  });

  describe('all', () => {
    let todos;
    let todo;

    beforeEach(() => {
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });
      todoResource.create({
        text: 'Hello World 2',
        completed: true,
      });

      todos = todoResource.all();
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
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });
      todoResource.create({
        text: 'Hello World 2',
        completed: true,
      });
      todoResource.create({
        text: 'Hello World 3',
        completed: false,
      });
    });

    it('text', () => {
      todos = todoResource.where({ text: 'Hello World' }).get();

      assert(todos.length === 1);
      assert(todos[0].text === 'Hello World');
    });

    it('bool', () => {
      todos = todoResource.where({ completed: true }).get();

      assert(todos.length === 2);
      assert(todos[0].text === 'Hello World');
      assert(todos[1].text === 'Hello World 2');
    });
  });

  describe('order', () => {
    let todos;
    let todo;

    beforeEach(() => {
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });
      todoResource.create({
        text: 'Hello World 2',
        completed: true,
      });
      todoResource.create({
        text: 'Hello World 3',
        completed: false,
      });
    });

    describe('text', () => {
      it('normal', () => {
        todos = todoResource.order('text').get();

        assert(todos.length === 3);
        assert(todos[0].text === 'Hello World');
        assert(todos[1].text === 'Hello World 2');
        assert(todos[2].text === 'Hello World 3');
      });

      it('reserse', () => {
        todos = todoResource.order('text', true).get();

        assert(todos.length === 3);
        assert(todos[0].text === 'Hello World 3');
        assert(todos[1].text === 'Hello World 2');
        assert(todos[2].text === 'Hello World');
      });
    });

    describe('bool', () => {
      it('normal', () => {
        todos = todoResource.order('completed').get();

        assert(todos.length === 3);
        assert(todos[0].text === 'Hello World 3');
        assert(todos[1].text === 'Hello World');
        assert(todos[2].text === 'Hello World 2');
      });

      it('reserse', () => {
        todos = todoResource.order('completed', true).get();

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
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });
      todoResource.create({
        text: 'Hello World 2',
        completed: true,
      });
      todoResource.create({
        text: 'Hello World 3',
        completed: false,
      });
    });

    it('top 2', () => {
      todos = todoResource.limit(2).get();

      assert(todos.length === 2);
      assert(todos[0].text === 'Hello World');
      assert(todos[1].text === 'Hello World 2');
    });
  });
});
