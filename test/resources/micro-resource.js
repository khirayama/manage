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

      const tasks = todoResource.all();
      const todo = tasks[0];

      assert(1 === tasks.length);
      assert('Hello World' === todo.text);
      assert(false === todo.completed);
      assert(undefined !== todo.id);
    });
  });

  describe('update', () => {
    let tasks;
    let todo;

    beforeEach(() => {
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });

      tasks = todoResource.all();
      todo = tasks[0];
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
    let tasks;
    let todo;

    beforeEach(() => {
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });

      tasks = todoResource.all();
      todo = tasks[0];
    });

    it('an item', () => {
      todoResource.destroy(todo.id);

      tasks = todoResource.all();
      assert(tasks.length === 0);
    });
  });

  describe('drop', () => {
    let tasks;
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

      tasks = todoResource.all();
      todo = tasks[0];
    });

    it('all item', () => {
      assert(tasks.length === 3);

      todoResource.drop();

      tasks = todoResource.all();
      assert(tasks.length === 0);
    });
  });

  describe('get', () => {
    let tasks;
    let todo;

    beforeEach(() => {
      todoResource.create({
        text: 'Hello World',
        completed: true,
      });

      tasks = todoResource.all();
      todo = tasks[0];
    });

    it('an item', () => {
      todo = todoResource.get(todo.id);

      assert(todo.text === 'Hello World');
      assert(todo.completed === true);
    });
  });

  describe('all', () => {
    let tasks;
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

      tasks = todoResource.all();
      todo = tasks[0];
    });

    it('all item', () => {
      assert(tasks.length === 2);
    });
  });

  describe('where', () => {
    let tasks;
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
      tasks = todoResource.where({ text: 'Hello World' }).get();

      assert(tasks.length === 1);
      assert(tasks[0].text === 'Hello World');
    });

    it('bool', () => {
      tasks = todoResource.where({ completed: true }).get();

      assert(tasks.length === 2);
      assert(tasks[0].text === 'Hello World');
      assert(tasks[1].text === 'Hello World 2');
    });
  });

  describe('order', () => {
    let tasks;
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
        tasks = todoResource.order('text').get();

        assert(tasks.length === 3);
        assert(tasks[0].text === 'Hello World');
        assert(tasks[1].text === 'Hello World 2');
        assert(tasks[2].text === 'Hello World 3');
      });

      it('reserse', () => {
        tasks = todoResource.order('text', true).get();

        assert(tasks.length === 3);
        assert(tasks[0].text === 'Hello World 3');
        assert(tasks[1].text === 'Hello World 2');
        assert(tasks[2].text === 'Hello World');
      });
    });

    describe('bool', () => {
      it('normal', () => {
        tasks = todoResource.order('completed').get();

        assert(tasks.length === 3);
        assert(tasks[0].text === 'Hello World 3');
        assert(tasks[1].text === 'Hello World');
        assert(tasks[2].text === 'Hello World 2');
      });

      it('reserse', () => {
        tasks = todoResource.order('completed', true).get();

        assert(tasks.length === 3);
        assert(tasks[0].text === 'Hello World');
        assert(tasks[1].text === 'Hello World 2');
        assert(tasks[2].text === 'Hello World 3');
      });
    });
  });

  describe('limit', () => {
    let tasks;
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
      tasks = todoResource.limit(2).get();

      assert(tasks.length === 2);
      assert(tasks[0].text === 'Hello World');
      assert(tasks[1].text === 'Hello World 2');
    });
  });
});
