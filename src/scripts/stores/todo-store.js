import MicroStore from './micro-store';

import logger from '../utils/logger';
import appDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';
import { parseTextToItem } from '../utils/text-to-schedule-parser';
import { validateByJSONSchema } from '../json-schemas/json-schema';
import { TODO_STORE_SCHEMA, TODOS_SCHEMA } from '../json-schemas/todo-store';


export default class TodoStore extends MicroStore {
  constructor() {
    super();

    this._todos = [];

    this.register(appDispatcher, {
      [types.GET_ALL_TODOS]: (todos) => {
        this.setTodos(todos);
        this.dispatchChange();
      },
      [types.CREATE_TODO]: (todo) => {
        this.create(todo);
        this.dispatchChange();
      },
      [types.COMPLETE_TODO]: (todo) => {
        this.update(todo);
        this.dispatchChange();
      },
      [types.EDIT_TODO]: (todo) => {
        this.update(todo);
        this.dispatchChange();
      },
      [types.UPDATE_TODO]: (todo) => {
        this.update(todo);
        this.dispatchChange();
      },
      [types.DELETE_TODO]: (id) => {
        this.delete(id);
        this.dispatchChange();
      },
    });
  }

  getTodos() {
    return this._todos;
  }

  setTodos(todos = []) {
    const newTodos = todos.splice(0);

    newTodos.forEach(todoCategory => {
      todoCategory.todos.forEach((todo, index) => {
        const newTodo = TodoStore._addSchedule(todo);

        todoCategory.todos.splice(index, 1, newTodo);
      });
    });

    validateByJSONSchema(newTodos, TODOS_SCHEMA);
    TodoStore._checkOrder(newTodos);
    this._todos = newTodos;
  }

  create(todo) {
    const newTodo = TodoStore._addSchedule(todo);

    validateByJSONSchema(newTodo, TODO_STORE_SCHEMA);
    this._todos.forEach(todoCategory => {
      if (todoCategory.categoryId === todo.categoryId) {
        todoCategory.todos.push(newTodo);
      }
    });
  }

  update(todo) {
    const newTodo = TodoStore._addSchedule(todo);

    validateByJSONSchema(newTodo, TODO_STORE_SCHEMA);
    this._todos.forEach((todoCategory) => {
      if (todoCategory.categoryId === todo.categoryId) {
        todoCategory.todos.forEach((todo_, index) => {
          if (todo_.id === todo.id) {
            todoCategory.todos.splice(index, 1, newTodo);
          }
        });
      }
    });
  }

  delete(id) {
    // To break a for loop
    for (let todoCategoryIndex = 0; todoCategoryIndex < this._todos.length; todoCategoryIndex++) {
      const todoCategory = this._todos[todoCategoryIndex];

      for (let todoIndex = 0; todoIndex < todoCategory.todos.length; todoIndex++) {
        const todo = todoCategory.todos[todoIndex];

        if (todo.id === id) {
          todoCategory.todos.splice(todoIndex, 1);
          return;
        }
      }
    }
  }

  static _addSchedule(todo) {
    const todoWithSchedule = parseTextToItem(todo.text);
    const newTodo = Object.assign({}, todo, {
      scheduleText: todoWithSchedule.text,
      schedule: todoWithSchedule.schedule,
    });

    return newTodo;
  }

  static _checkOrder(todos) {
    todos.forEach(todoCategory => {
      todoCategory.todos.forEach((todo, todoIndex) => {
        if (todo.order !== todoIndex) {
          logger.error({ error: 'Wrong order.', item: todo });
        }
      });
    });
  }
}
