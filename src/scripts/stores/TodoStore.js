import 'babel/polyfill';
import Store from '../libs/Store';
import AppDispatcher from '../dispatchers/AppDispatcher';
import {TODO, TODO_CATEGORY} from '../constants/constants';

class TodoStore extends Store {
  constructor() {
    super();
    this.default = {
      text: '',
      completed: false,
      category: TODO_CATEGORY.TODAY
    }
    this.register(AppDispatcher, {
      [TODO.CREATE]: (entity) => {
        this._create(entity);
      }
    });
  }
}
export default new TodoStore();
