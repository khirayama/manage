import MicroStorage from './micro-storage';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { todoCategoryEvents } from '../constants/constants';

const todoCategory = {
  TODAY: 'TODAY',
  LATER: 'LATER',
  SCHEDULE: 'SCHEDULE',
};

export class TodoCategoryStorage extends MicroStorage {
  constructor() {
    super();
    this.defaults = {
      name: '',
      order: 0,
    };
    this.register(AppDispatcher, {
      [todoCategoryEvents.CREATE]: (payload) => {
        this.create(payload.entity);
      },
      [todoCategoryEvents.UPDATE]: (payload) => {
        this.update(payload.id, payload.updates);
      },
      [todoCategoryEvents.DESTROY]: (payload) => {
        this.destroy(payload.id);
      },
    });
    this.init();
  }

  init() {
    const categories = this.all();

    if (!categories.length) {
      this.create({ name: todoCategory.TODAY, order: 0 });
      this.create({ name: todoCategory.LATER, order: 1 });
      this.create({ name: todoCategory.SCHEDULE, order: 2 });
    }
  }
}
export default new TodoCategoryStorage();
