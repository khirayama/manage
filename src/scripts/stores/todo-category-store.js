import MicroStore from './micro-store';

import AppDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema.js';
import todoCategoryStoreSchema from '../json-schemas/todo-category-store.json';


export default class TodoCategoryStore extends MicroStore {
  constructor() {
    super();

    this._todoCategories = [];

    this.register(AppDispatcher, {
      [types.GET_ALL_TODO_CATEGORIES]: (todoCategories) => {
        todoCategories.forEach(todoCategory => {
          validateByJSONSchema(todoCategory, todoCategoryStoreSchema);
        });

        this.setTodoCategories(todoCategories);
        this.dispatchChange();
      },
      [types.CREATE_TODO_CATEGORY]: (todoCategory) => {
        validateByJSONSchema(todoCategory, todoCategoryStoreSchema);

        this.create(todoCategory);
        this.dispatchChange();
      },
      [types.EDIT_TODO_CATEGORY]: (todoCategory) => {
        validateByJSONSchema(todoCategory, todoCategoryStoreSchema);

        this.update(todoCategory);
        this.dispatchChange();
      },
      [types.UPDATE_TODO_CATEGORY]: (todoCategory) => {
        validateByJSONSchema(todoCategory, todoCategoryStoreSchema);

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
    this._todoCategories = todoCategories;
  }

  create(todoCategory) {
    this._todoCategories.push(todoCategory);
  }

  update(todoCategory) {
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
}
