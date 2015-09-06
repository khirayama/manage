import 'babel/polyfill';
import Store from '../libs/Store';

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
    };
    this.init();
  }

  init() {
    const categories = this.get();

    if (!categories.length) {
      this._create({ name: TODO_CATEGORY.TODAY });
      this._create({ name: TODO_CATEGORY.LATER });
      this._create({ name: TODO_CATEGORY.SCHEDULE });
    }
  }
}
export default new TodoCategoryStore();
