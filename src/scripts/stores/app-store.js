import { pages, actionTypes as types } from '../constants/constants';
import { getTodos } from '../actions/todo-action-creators';
import { getTodoCategories } from '../actions/todo-category-action-creators';
import appDispatcher from '../dispatchers/app-dispatcher';
import MicroStore from './micro-store';
import TodoStore from './todo-store';
import TodoCategoryStore from './todo-category-store';


export default class AppStore extends MicroStore {
  constructor() {
    super();

    this._page = null;
    this._history = [];

    this.routes();
    this.createTodosPage();

    this.register(appDispatcher, {
      [types.BACK_PAGE]: () => {
        const page = this._history[this._history.length - 2];

        this._history.splice(this._history.length - 2, 2);
        this.emit(page);
        this.dispatchChange();
      },
      [types.CHANGE_PAGE]: (page) => {
        this.emit(page);
        this.dispatchChange();
      },
    });
  }

  routes() {
    this.on(pages.TODOS, () => {
      this.createTodosPage();
    });

    this.on(pages.MENU, () => {
      this.createMenuPage();
    });

    this.on(pages.TODO_CATEGORIES, () => {
      this.createTodoCategoriesPage();
    });
  }

  _changePage(page) {
    this._history.push(page);
    this._page = page;
  }

  getPage() {
    return this._page;
  }

  createTodosPage() {
    this._changePage(pages.TODOS);
    this.todoStore = this.todoStore || new TodoStore();

    getTodos();

    this.todoStore.addChangeListener(() => {
      this.dispatchChange();
    });
  }

  createMenuPage() {
    this._changePage(pages.MENU);
  }

  createTodoCategoriesPage() {
    this._changePage(pages.TODO_CATEGORIES);
    this.todoCategoryStore = this.todoCategoryStore || new TodoCategoryStore();

    getTodoCategories();

    this.todoCategoryStore.addChangeListener(() => {
      this.dispatchChange();
    });
  }
}
