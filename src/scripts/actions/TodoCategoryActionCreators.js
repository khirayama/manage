import AppDispatcher from '../dispatchers/AppDispatcher';
import { todoCategoryEvents } from '../constants/constants';

class TodoCategoryActionCreators {
  create(entity) {
    AppDispatcher.dispatch(todoCategoryEvents.CREATE, { entity: entity });
  }

  update(id, updates) {
    AppDispatcher.dispatch(todoCategoryEvents.UPDATE, { id: id, updates: updates });
  }

  destroy(id) {
    AppDispatcher.dispatch(todoCategoryEvents.DESTROY, { id: id });
  }
}
export default new TodoCategoryActionCreators();
