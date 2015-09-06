import 'babel/polyfill';
import Store from '../libs/Store';
import AppDispatcher from '../dispatchers/AppDispatcher';

const TODO_CATEGORY = {
  TODAY: 'TODAY',
  LATER: 'LATER',
  SCHEDULE: 'SCHEDULE'
};

class TodoCategoryStore extends Store {
  constructor() {
    super();
    this.defaults = {
      name: ''
    }
    this.init();
  }

  init() {
    let categories = this.get();

    if (!categories.length) {
      this._create({ name: TODO_CATEGORY.TODAY });
      this._create({ name: TODO_CATEGORY.LATER });
      this._create({ name: TODO_CATEGORY.SCHEDULE });
    }
  }
}
export default new TodoCategoryStore();
