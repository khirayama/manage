import assert from 'power-assert';

import {
  getTodos,
  createTodo,
  completeTodo,
  editTodo,
  updateTodo,
  deleteTodo,
  sortTodos,
} from '../../src/scripts/actions/todo-action-creators';
import todoStorage from '../../src/scripts/storages/todo-storage';
import todoCategoryStorage from '../../src/scripts/storages/todo-category-storage';
import appDispatcher from '../../src/scripts/dispatchers/app-dispatcher';
import { actionTypes as types, initialTodoCategoryNames } from '../../src/scripts/constants/constants';


describe('TodoActionCreators', () => {
  let todoCategoryId;

  beforeEach(() => {
    todoStorage.drop();
    todoCategoryStorage.drop();
    todoCategoryStorage.init();
    todoCategoryId = todoCategoryStorage.all()[0].id;
    appDispatcher._listeners = {};
  });

  describe('getTodos', () => {
    it('get all todos', (done) => {
      appDispatcher.on(types.GET_ALL_TODOS, (todos) => {
        assert(todos[0].categoryName === initialTodoCategoryNames.TODAY);
        assert(todos[1].categoryName === initialTodoCategoryNames.LATER);
        assert(todos[2].categoryName === initialTodoCategoryNames.SCHEDULE);
        done();
      });
      getTodos();
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
      appDispatcher.on(types.EDIT_TODO, (id) => {
        assert(id !== undefined);
        done();
      });
      createTodo('Hello World', todoCategoryId);

      const todos = todoStorage.all();
      const todo_ = todos[0];

      editTodo(todo_.categoryId, todo_.order);
    });
  });

  describe('updateTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.EDIT_TODO, (todo) => {
        assert(todo.id !== undefined);
        assert(todo.text === 'Hello New World');
        assert(todo.completed === false);
        done();
      });
      createTodo('Hello World', todoCategoryId);

      const todos = todoStorage.all();
      const todo_ = todos[0];

      updateTodo(todo_.id, 'Hello New World');
    });
  });

  describe('completeTodo', () => {
    it('an item', (done) => {
      appDispatcher.on(types.COMPLETE_TODO, (todo) => {
        assert(todo.id !== undefined);
        assert(todo.text === 'Hello World');
        assert(todo.completed === true);
        done();
      });
      createTodo('Hello World', todoCategoryId);

      const todos = todoStorage.all();
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

      const todos = todoStorage.all();
      const todo_ = todos[0];

      deleteTodo(todo_.categoryId, todo_.id);
    });
  });

  describe('sortTodos', () => {
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
      sortTodos(todoCategoryId, 0, 1);
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
      sortTodos(todoCategoryId, 1, 0);
    });
  });
});
