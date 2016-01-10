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
      otherCategories: [],
      todos: [{
        categoryId: 'category-id-AAA-0',
        id: 'id-AAA-0',
        text: 'Hello World A',
        completed: false,
        order: 0,
        schedule: null,
        scheduleText: '',
        isEditing: false,
      }, {
        categoryId: 'category-id-AAA-1',
        id: 'id-AAA-1',
        text: 'Hello World A 2',
        completed: false,
        order: 1,
        schedule: null,
        scheduleText: '',
        isEditing: false,
      }, {
        categoryId: 'category-id-AAA-2',
        id: 'id-AAA-2',
        text: 'fri Hello World A 3',
        completed: false,
        order: 2,
        schedule: null,
        scheduleText: '',
        isEditing: false,
      }],
    }, {
      categoryName: 'BBB',
      categoryId: 'id-BBB',
      otherCategories: [],
      todos: [{
        categoryId: 'category-id-BBB-0',
        id: 'id-BBB-0',
        text: 'Hello World B',
        completed: false,
        order: 0,
        schedule: null,
        scheduleText: '',
        isEditing: false,
      }],
    }]);
  });

  describe('setTodos', () => {
    it('initial', () => {
      todos = todoStore._todos;

      assert(todos[0].todos[2].schedule !== null);
      assert(todos[0].todos[2].schedule.dayName === 'Friday');
    });
  });

  describe('create', () => {
    it('an item', () => {
      todoStore.create({
        categoryId: 'id-BBB',
        id: 'id-BBB-1',
        text: 'Hello World B 2',
        completed: false,
        order: 1,
        schedule: null,
        scheduleText: '',
        isEditing: false,
      });

      todos = todoStore._todos;

      assert(todos[1].todos.length === 2);
      assert(todos[1].todos[1].text === 'Hello World B 2');
      assert(todos[1].todos[1].schedule === null);
    });
  });

  describe('update', () => {
    it('an item', () => {
      todoStore.update({
        categoryId: 'id-BBB',
        id: 'id-BBB-0',
        text: 'Hello New World B',
        completed: false,
        order: 1,
        schedule: null,
        scheduleText: '',
        isEditing: false,
      });

      todos = todoStore._todos;

      assert(todos[1].todos.length === 1);
      assert(todos[1].todos[0].text === 'Hello New World B');
      assert(todos[1].todos[0].schedule === null);
    });
  });

  describe('apply parseTextToItem', () => {
    it('fri meets my friends', () => {
      todoStore.create({
        categoryId: 'id-BBB',
        id: 'id-BBB-1',
        text: 'fri meets my friends',
        completed: false,
        order: 1,
        schedule: null,
        scheduleText: '',
        isEditing: false,
      });

      todos = todoStore._todos;

      assert(todos[1].todos.length === 2);
      assert(todos[1].todos[1].text === 'fri meets my friends');
      assert(todos[1].todos[1].scheduleText === 'meets my friends');
      assert(todos[1].todos[1].schedule.year !== undefined);
    });
  });
});
