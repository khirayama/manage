import 'babel/polyfill';
import Store from '../libs/DataStore';
import AppDispatcher from '../dispatchers/AppDispatcher';
import {TODO, TODO_CATEGORY} from '../constants/constants';

class TodoStore extends Store {
  constructor(dbName, storeName, version) {
    super(dbName, storeName, version);
    this.default = {
      text: '',
      completed: false,
      category: TODO_CATEGORY.TODAY
    }
    this.register(AppDispatcher, {
      [TODO.CREATE]: (payload) => {
        this._create(payload.entity);
      },
      [TODO.UPDATE]: (payload) => {
        this._update(payload.id, payload.updates);
      },
      [TODO.DESTROY]: (payload) => {
        this._destroy(payload.id);
      }
    });
  }
}
export default new TodoStore('App', 'Todo', 1.0);
