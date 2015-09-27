import MicroStore from 'micro-store';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { todoCategoryEvents } from '../constants/constants';

const todoCategory = {
  TODAY: 'TODAY',
  LATER: 'LATER',
  SCHEDULE: 'SCHEDULE',
};

export class TodoCategoryStore extends MicroStore {
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
    const categories = this.get();

    if (!categories.length) {
      this.create({ name: todoCategory.TODAY, order: 0 });
      this.create({ name: todoCategory.LATER, order: 1 });
      this.create({ name: todoCategory.SCHEDULE, order: 2 });
    }
  }
}
export default new TodoCategoryStore();
