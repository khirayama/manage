import 'babel/polyfill';
import Store from '../libs/Store';
import {TODO_CATEGORY} from '../constants/constants';

class TodoStore extends Store {
  constructor() {
    super();
    this.default = {
      text: '',
      completed: false,
      category: TODO_CATEGORY.TODAY
    }
  }
}
export default new TodoStore();
