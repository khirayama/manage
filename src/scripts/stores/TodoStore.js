import 'babel/polyfill';
import Store from '../libs/Store';
import AppDispatcher from '../dispatchers/AppDispatcher';
import TodoCategoryStore from './TodoCategoryStore';
import { TODO } from '../constants/constants';

class TodoStore extends Store {
  constructor() {
    super();
    this.defaults = {
      text: '',
      completed: false,
      categoryId: null,
      order: null
    };
    this.association = [
      { type: 'hasOne', store: TodoCategoryStore, key: 'categoryId', value: 'category' }
    ];
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
export default new TodoStore();
