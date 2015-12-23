import MicroStore from './micro-store';

import AppDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';


export default class TodoCategoryStore extends MicroStore {
  constructor() {
    super();

    this._todoCategories = [];

    this.register(AppDispatcher, {
      [types.CREATE_TODO_CATEGORY]: ({ entity }) => {
        this.create(entity);
        this.dispatchChange();
      },
      [types.EDIT_TODO_CATEGORY]: ({ entity }) => {
        this.edit(entity);
        this.dispatchChange();
      },
      [types.DELETE_TODO_CATEGORY]: ({ id }) => {
        this.delete(id);
        this.dispatchChange();
      },
    });
  }

  create(todoCategory) {
    this._todoCategories.push(todoCategory);
  }

  edit(todoCategory) {
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
