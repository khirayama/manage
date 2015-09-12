import 'babel/polyfill';
import Store from '../libs/Store';

const todoCategory = {
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
      this.create({ name: todoCategory.TODAY });
      this.create({ name: todoCategory.LATER });
      this.create({ name: todoCategory.SCHEDULE });
    }
  }
}
export default new TodoCategoryStore();
