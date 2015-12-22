import MicroStorage from './micro-storage';
import AppDispatcher from '../dispatchers/app-dispatcher';

const INITIAL_TODO_CATEGORIES = {
  TODAY: 'TODAY',
  LATER: 'LATER',
  SCHEDULE: 'SCHEDULE',
};

export class TodoCategoryStorage extends MicroStorage {
  constructor() {
    super();
    this.defaults = {
      name: '',
      order: null,
    };
    this.init();
  }

  init() {
    const todoCategories = this.all();

    if (!todoCategories.length) {
      this.create({ name: INITIAL_TODO_CATEGORIES.TODAY, order: 0 });
      this.create({ name: INITIAL_TODO_CATEGORIES.LATER, order: 1 });
      this.create({ name: INITIAL_TODO_CATEGORIES.SCHEDULE, order: 2 });
    }
  }
}
export default new TodoCategoryStorage();
