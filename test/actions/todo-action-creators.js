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
    it('get all todos', (done) => {
      appDispatcher.on(types.GET_ALL_TODOS, (todos) => {
        assert(todos[0].categoryName === initialTodoCategoryNames.TODAY);
        assert(todos[1].categoryName === initialTodoCategoryNames.LATER);
        assert(todos[2].categoryName === initialTodoCategoryNames.SCHEDULE);
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

      const todos = todoResource.all();
      const todo_ = todos[0];

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

      const todos = todoResource.all();
      const todo_ = todos[0];

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

      const todos = todoResource.all();
      const todo_ = todos[0];

      completeTodo(todo_.id);
    });
  });

  describe('deleteTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.GET_ALL_TODOS, (todos_) => {
        // num of todo categories is 3
        assert(todos_[0].todos.length === 0);
        assert(todos_[1].todos.length === 0);
        assert(todos_[2].todos.length === 0);
        done();
      });
      createTodo('Hello World', todoCategoryId);

      const todos = todoResource.all();
      const todo_ = todos[0];

      deleteTodo(todo_.categoryId, todo_.id);
    });
  });

  describe('sortTasks', () => {
    it('from < to', (done) => {
      appDispatcher.on(types.GET_ALL_TODOS, (todos) => {
        assert(todos[0].todos.length === 3);
        assert(todos[0].todos[0].text === 'Hello World 1');
        assert(todos[0].todos[1].text === 'Hello World 0');
        done();
      });
      createTodo('Hello World 0', todoCategoryId);
      createTodo('Hello World 1', todoCategoryId);
      createTodo('Hello World 2', todoCategoryId);
      sortTasks(todoCategoryId, 0, 1);
    });
    it('to < from', (done) => {
      appDispatcher.on(types.GET_ALL_TODOS, (todos) => {
        assert(todos[0].todos.length === 3);
        assert(todos[0].todos[0].text === 'Hello World 1');
        assert(todos[0].todos[1].text === 'Hello World 0');
        done();
      });
      createTodo('Hello World 0', todoCategoryId);
      createTodo('Hello World 1', todoCategoryId);
      createTodo('Hello World 2', todoCategoryId);
      sortTasks(todoCategoryId, 1, 0);
    });
  });
});
