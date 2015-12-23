import MicroStorage from './micro-storage';
import { initialTodoCategoryNames } from '../constants/constants';


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
      this.create({ name: initialTodoCategoryNames.TODAY, order: 0 });
      this.create({ name: initialTodoCategoryNames.LATER, order: 1 });
      this.create({ name: initialTodoCategoryNames.SCHEDULE, order: 2 });
    }
  }
}
export default new TodoCategoryStorage();
