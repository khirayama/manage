import MicroStore from './micro-store';

import AppDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';
import { parseTextToItem } from '../utils/text-to-schedule-parser.js';


export default class TodoStore extends MicroStore {
  constructor() {
    super();

    this._todos = [];

    this.register(AppDispatcher, {
      [types.GET_ALL_TODOS]: ({ todos }) => {
        this.setTodos(todos);
        this.dispatchChange();
      },
      [types.CREATE_TODO]: ({ todo }) => {
        this.create(todo);
        this.dispatchChange();
      },
      [types.COMPLETE_TODO]: ({ todo }) => {
        this.update(todo);
        this.dispatchChange();
      },
      [types.EDIT_TODO]: ({ todo }) => {
        this.update(todo);
        this.dispatchChange();
      },
      [types.DELETE_TODO]: ({ id }) => {
        this.delete(id);
        this.dispatchChange();
      },
    });
  }

  setTodos(todos) {
    this._todos = todos;
  }

  create(todo) {
    const todoWithSchedule = parseTextToItem(todo.text);
    const newTodo = Object.assign({}, todo, {
      text: todoWithSchedule.text,
      schedule: todoWithSchedule.schedule,
    });

    this._todos.forEach((todoCategory) => {
      if (todoCategory.categoryId === todo.categoryId) {
        todoCategory.todos.push(newTodo);
      }
    });
  }

  update(todo) {
    const todoWithSchedule = parseTextToItem(todo.text);
    const newTodo = Object.assign({}, todo, {
      text: todoWithSchedule.text,
      schedule: todoWithSchedule.schedule,
    });

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
}
