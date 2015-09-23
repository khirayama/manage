import 'babel/polyfill';
import Store from '../libs/Store';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { todoEvents } from '../constants/constants';

class TodoStore extends Store {
  constructor() {
    super();
    this.defaults = {
      text: '',
      completed: false,
      categoryId: null,
      order: 0,
    };
    this.register(AppDispatcher, {
      [todoEvents.CREATE]: (payload) => {
        this.create(payload.entity);
      },
      [todoEvents.UPDATE]: (payload) => {
        this.update(payload.id, payload.updates);
      },
      [todoEvents.DESTROY]: (payload) => {
        this.destroy(payload.id);
      },
    });
  }
}
export default new TodoStore();
