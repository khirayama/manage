import MicroStore from './micro-store';

import logger from '../utils/logger';
import appDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema.js';
import { TODO_CATEGORY_STORE_SCHEMA, TODO_CATEGORIES_STORE_SCHEMA } from '../json-schemas/todo-category-store.js';


export default class TodoCategoryStore extends MicroStore {
  constructor() {
    super();

    this._todoCategories = [];

    this.register(appDispatcher, types.GET_ALL_TODO_CATEGORIES, todoCategories => {
      this.setTodoCategories(todoCategories);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.CREATE_TODO_CATEGORY, todoCategory => {
      this.create(todoCategory);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.GET_ALL_TODO_CATEGORIES, todoCategories => {
      this.setTodoCategories(todoCategories);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.UPDATE_TODO_CATEGORY, todoCategory => {
      this.update(todoCategory);
      this.dispatchChange();
    });
  }

  getTodoCategories() {
    return this._todoCategories;
  }

  setTodoCategories(todoCategories = []) {
    validateByJSONSchema(todoCategories, TODO_CATEGORIES_STORE_SCHEMA);
    TodoCategoryStore._checkOrder(todoCategories);
    this._todoCategories = todoCategories;
  }

  create(todoCategory) {
    validateByJSONSchema(todoCategory, TODO_CATEGORY_STORE_SCHEMA);
    this._todoCategories.push(todoCategory);
  }

  update(todoCategory) {
    validateByJSONSchema(todoCategory, TODO_CATEGORY_STORE_SCHEMA);
    this._todoCategories.forEach((todoCategory_, index) => {
      if (todoCategory_.id === todoCategory.id) {
        this._todoCategories.splice(index, 1, todoCategory);
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
