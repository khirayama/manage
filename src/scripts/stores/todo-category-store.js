import MicroStore from './micro-store';

import logger from '../utils/logger';
import appDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema.js';
import { TODO_CATEGORY_SCHEMA, TODO_CATEGORIES_SCHEMA } from '../json-schemas/todo-category-store.js';


export default class TodoCategoryStore extends MicroStore {
  constructor() {
    super();

    this._todoCategories = [];

    this.register(appDispatcher, {
      [types.GET_ALL_TODO_CATEGORIES]: (todoCategories) => {
        this.setTodoCategories(todoCategories);
        this.dispatchChange();
      },
      [types.CREATE_TODO_CATEGORY]: (todoCategory) => {
        this.create(todoCategory);
        this.dispatchChange();
      },
      [types.EDIT_TODO_CATEGORY]: (todoCategory) => {
        this.update(todoCategory);
        this.dispatchChange();
      },
      [types.UPDATE_TODO_CATEGORY]: (todoCategory) => {
        this.update(todoCategory);
        this.dispatchChange();
      },
      [types.DELETE_TODO_CATEGORY]: (id) => {
        this.delete(id);
        this.dispatchChange();
      },
    });
  }

  getTodoCategories() {
    return this._todoCategories;
  }

  setTodoCategories(todoCategories = []) {
    validateByJSONSchema(todoCategories, TODO_CATEGORIES_SCHEMA);
    TodoCategoryStore._checkOrder(todoCategories);
    this._todoCategories = todoCategories;
  }

  create(todoCategory) {
    validateByJSONSchema(todoCategory, TODO_CATEGORY_SCHEMA);
    this._todoCategories.push(todoCategory);
  }

  update(todoCategory) {
    validateByJSONSchema(todoCategory, TODO_CATEGORY_SCHEMA);
    this._todoCategories.forEach((todoCategory_, index) => {
      if (todoCategory_.id === todoCategory.id) {
        this._todoCategories.splice(index, 1, todoCategory);
      }
    });
  }

  delete(id) {
    this._todoCategories.forEach((todoCategory_, index) => {
      if (todoCategory_.id === id) {
        this._todoCategories.splice(index, 1);
      }
    });
  }

  static _checkOrder(todoCategories) {
    todoCategories.forEach((todoCategory, todoCategoryIndex) => {
      if (todoCategory.order !== todoCategoryIndex) {
        logger.error({ error: 'Wrong order.', item: todoCategory });
      }
    });
  }
}
