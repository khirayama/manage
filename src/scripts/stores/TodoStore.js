import 'babel/polyfill';
import Store from './BaseStore';

class TodoStore extends Store {
  constructor() {
    super();
    this.default = {
      text: '',
      completed: false
    }
  }
}
export default new TodoStore();
