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

    this._tasks = [];

    this.register(appDispatcher, types.GET_ALL_TODOS, tasks => {
      this.setTasks(tasks);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.CREATE_TODO, todo => {
      this.create(todo);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.UPDATE_TODO, todo => {
      this.update(todo);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.CREATE_TODO_CATEGORY, todoCategory => {
      this.addTodoCategory(todoCategory);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.EDIT_TODO_CATEGORY, todoCategory => {
      this.updateTodoCategory(todoCategory);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.UPDATE_TODO_CATEGORY, todoCategory => {
      this.updateTodoCategory(todoCategory);
      this.dispatchChange();
    });
  }

  getTasks() {
    return this._tasks;
  }

  setTasks(tasks = []) {
    const newTasks = tasks.splice(0);

    newTasks.forEach(todoCategory => {
      todoCategory.tasks.forEach((todo, index) => {
        const newTodo = TodoStore._addSchedule(todo);

        todoCategory.tasks.splice(index, 1, newTodo);
      });
    });

    validateByJSONSchema(newTasks, TODOS_SCHEMA);
    TodoStore._checkOrder(newTasks);
    this._tasks = newTasks;
  }

  create(todo) {
    const newTodo = TodoStore._addSchedule(todo);

    validateByJSONSchema(newTodo, TODO_STORE_SCHEMA);
    this._tasks.forEach(todoCategory => {
      if (todoCategory.categoryId === todo.categoryId) {
        todoCategory.tasks.push(newTodo);
      }
    });
  }

  update(todo) {
    const newTodo = TodoStore._addSchedule(todo);

    validateByJSONSchema(newTodo, TODO_STORE_SCHEMA);
    this._tasks.forEach((todoCategory) => {
      if (todoCategory.categoryId === todo.categoryId) {
        todoCategory.tasks.forEach((todo_, index) => {
          if (todo_.id === todo.id) {
            todoCategory.tasks.splice(index, 1, newTodo);
          }
        });
      }
    });
  }

  _transformTodoCategory(rawTodoCategory) {
    return {
      categoryId: rawTodoCategory.id,
      categoryName: rawTodoCategory.name,
      isEditing: rawTodoCategory.isEditing,
      tasks: [],
    };
  }

  addTodoCategory(todoCategory) {
    this._tasks.push(this._transformTodoCategory(todoCategory));
  }

  updateTodoCategory(todoCategory) {
    for (let todoIndex = 0; todoIndex < this._tasks.length; todoIndex++) {
      const todoCategory_ = this._tasks[todoIndex];
      if (todoCategory_.categoryId === todoCategory.id) {
        todoCategory_.categoryId = todoCategory.id;
        todoCategory_.categoryName = todoCategory.name;
        todoCategory_.isEditing = todoCategory.isEditing;
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

  static _checkOrder(tasks) {
    tasks.forEach(todoCategory => {
      todoCategory.tasks.forEach((todo, todoIndex) => {
        if (todo.order !== todoIndex) {
          logger.error({ error: 'Wrong order.', item: todo });
        }
      });
    });
  }
}
