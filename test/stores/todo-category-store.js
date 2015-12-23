import assert from 'power-assert';

import TodoStore from '../../src/scripts/stores/todo-store';


describe('TodoStore', () => {
  let todoStore;
  let todos;

  beforeEach(() => {
    todoStore = new TodoStore();
    todoStore.setTodos([{
      categoryName: 'AAA',
      categoryId: 'id-AAA',
      todos: [{
        id: 'id-AAA-0',
        text: 'Hello World A',
        completed: false,
        order: 0,
      }, {
        id: 'id-AAA-1',
        text: 'Hello World A 2',
        completed: false,
        order: 1,
      }],
    }, {
      categoryName: 'BBB',
      categoryId: 'id-BBB',
      todos: [{
        id: 'id-BBB-0',
        text: 'Hello World B',
        completed: false,
        order: 0,
      }],
    }]);
  });

  describe('create', () => {
    it('an item', () => {
      todoStore.create({
        categoryId: 'id-BBB',
        id: 'id-BBB-1',
        text: 'Hello World B 2',
        completed: false,
        order: 1,
      });

      todos = todoStore._todos;

      assert(todos[1].todos.length === 2);
      assert(todos[1].todos[1].text === 'Hello World B 2');
    });
  });

  describe('update', () => {
    it('an item', () => {
      todoStore.update({
        categoryId: 'id-BBB',
        id: 'id-BBB-0',
        text: 'Hello New World B',
      });

      todos = todoStore._todos;

      assert(todos[1].todos.length === 1);
      assert(todos[1].todos[0].text === 'Hello New World B');
    });
  });

  describe('delete', () => {
    it('an item', () => {
      todoStore.delete('id-AAA-1');

      todos = todoStore._todos;

      assert(todos[0].todos.length === 1);
    });
  });
});