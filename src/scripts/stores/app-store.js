import MicroStore from 'micro-store';
import AppDispatcher from '../dispatchers/app-dispatcher';
import TodoStore from '../todo-store';
import TodoCategoryStore from '../todo-category-store';


export default class AppStore extends MicroStore {
  constructor() {
    this.todoStore = new TodoStore();
    this.todoCategoryStore = new TodoCategoryStore();
    // this.register(AppDispatcher, {
    //   [todoCategoryEvents.CREATE]: (payload) => {
    //     this.create(payload.entity);
    //   },
    //   [todoCategoryEvents.UPDATE]: (payload) => {
    //     this.update(payload.id, payload.updates);
    //   },
    //   [todoCategoryEvents.DESTROY]: (payload) => {
    //     this.destroy(payload.id);
    //   },
    // });
  }
}
