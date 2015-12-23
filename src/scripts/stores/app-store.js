import MicroStore from 'micro-store';
import AppDispatcher from '../dispatchers/app-dispatcher';
import { getTodos } from '../actions/todo-action-creators';
import { getTodoCategories } from '../actions/todo-category-action-creators';
import TodoStore from './todo-store';
import TodoCategoryStore from './todo-category-store';


export default class AppStore extends MicroStore {
  constructor() {
    super();

    this.todoStore = new TodoStore();
    this.todoCategoryStore = new TodoCategoryStore();

    this.initialize();
    this.setChangeEventHandlers();
  }

  initialize() {
    getTodos();
    getTodoCategories();
  }

  setChangeEventHandlers() {
    this.todoStore.addChangeListener(() => {
      this.dispatchChange();
    });
    this.todoCategoryStore.addChangeListener(() => {
      this.dispatchChange();
    });
  }
}
