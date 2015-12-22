import MicroStorage from './micro-storage';
import AppDispatcher from '../dispatchers/app-dispatcher';

export class TodoStorage extends MicroStorage {
  constructor(options) {
    super(options);
    this.defaults = {
      text: '',
      completed: false,
      categoryId: null,
      order: null,
    };
  }
}
export default new TodoStorage();
