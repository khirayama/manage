import assert from 'power-assert';

import {
  getTasks,
  createTodo,
  completeTodo,
  editTodo,
  updateTodo,
  deleteTodo,
  sortTasks,
} from '../../src/scripts/actions/task-action-creators';
import todoResource from '../../src/scripts/resources/todo-resource';
import todoCategoryResource from '../../src/scripts/resources/todo-category-resource';
import appDispatcher from '../../src/scripts/dispatchers/app-dispatcher';
import { actionTypes as types, initialTodoCategoryNames } from '../../src/scripts/constants/constants';


describe('TodoActionCreators', () => {
  let todoCategoryId;

  beforeEach(() => {
    todoResource.drop();
    todoCategoryResource.drop();
    todoCategoryResource.init();
    todoCategoryId = todoCategoryResource.all()[0].id;
    appDispatcher._listeners = {};
  });

  describe('getTasks', () => {
    it('get all tasks', (done) => {
      appDispatcher.on(types.GET_ALL_TODOS, (tasks) => {
        assert(tasks[0].categoryName === initialTodoCategoryNames.TODAY);
        assert(tasks[1].categoryName === initialTodoCategoryNames.LATER);
        assert(tasks[2].categoryName === initialTodoCategoryNames.SCHEDULE);
        done();
      });
      getTasks();
    });
  });

  describe('createTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.CREATE_TODO, (todo) => {
        assert(todo.id !== undefined);
        assert(todo.text === 'Hello World');
        assert(todo.completed === false);
        done();
      });
      createTodo('Hello World', todoCategoryId);
    });
  });

  describe('editTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.UPDATE_TODO, (id) => {
        assert(id !== undefined);
        done();
      });
      createTodo('Hello World', todoCategoryId);

      const tasks = todoResource.all();
      const todo_ = tasks[0];

      editTodo(todo_.id);
    });
  });

  describe('updateTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.UPDATE_TODO, (todo) => {
        assert(todo.id !== undefined);
        assert(todo.text === 'Hello New World');
        assert(todo.completed === false);
        done();
      });
      createTodo('Hello World', todoCategoryId);

      const tasks = todoResource.all();
      const todo_ = tasks[0];

      updateTodo(todo_.id, 'Hello New World');
    });
  });

  describe('completeTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.UPDATE_TODO, (todo) => {
        assert(todo.id !== undefined);
        assert(todo.text === 'Hello World');
        assert(todo.completed === true);
        done();
      });
      createTodo('Hello World', todoCategoryId);

      const tasks = todoResource.all();
      const todo_ = tasks[0];

      completeTodo(todo_.id);
    });
  });

  describe('deleteTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.GET_ALL_TODOS, (tasks_) => {
        // num of todo categories is 3
        assert(tasks_[0].tasks.length === 0);
        assert(tasks_[1].tasks.length === 0);
        assert(tasks_[2].tasks.length === 0);
        done();
      });
      createTodo('Hello World', todoCategoryId);

      const tasks = todoResource.all();
      const todo_ = tasks[0];

      deleteTodo(todo_.categoryId, todo_.id);
    });
  });

  describe('sortTasks', () => {
    it('from < to', (done) => {
      appDispatcher.on(types.GET_ALL_TODOS, (tasks) => {
        assert(tasks[0].tasks.length === 3);
        assert(tasks[0].tasks[0].text === 'Hello World 1');
        assert(tasks[0].tasks[1].text === 'Hello World 0');
        done();
      });
      createTodo('Hello World 0', todoCategoryId);
      createTodo('Hello World 1', todoCategoryId);
      createTodo('Hello World 2', todoCategoryId);
      sortTasks(todoCategoryId, 0, 1);
    });
    it('to < from', (done) => {
      appDispatcher.on(types.GET_ALL_TODOS, (tasks) => {
        assert(tasks[0].tasks.length === 3);
        assert(tasks[0].tasks[0].text === 'Hello World 1');
        assert(tasks[0].tasks[1].text === 'Hello World 0');
        done();
      });
      createTodo('Hello World 0', todoCategoryId);
      createTodo('Hello World 1', todoCategoryId);
      createTodo('Hello World 2', todoCategoryId);
      sortTasks(todoCategoryId, 1, 0);
    });
  });
});
