import MicroStorage from './micro-storage';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { todoEvents } from '../constants/constants';

export class TodoStorage extends MicroStorage {
  constructor(options) {
    super(options);
    this.defaults = {
      text: '',
      completed: false,
      categoryId: null,
      order: 0,
    };
  }
}
export default new TodoStorage();
