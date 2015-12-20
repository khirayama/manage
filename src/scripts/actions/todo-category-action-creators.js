import AppDispatcher from '../dispatchers/AppDispatcher';
import { todoCategoryEvents } from '../constants/constants';

class TodoCategoryActions {
  create(entity) {
    AppDispatcher.emit(todoCategoryEvents.CREATE, { entity: entity });
  }

  update(id, updates) {
    AppDispatcher.emit(todoCategoryEvents.UPDATE, { id: id, updates: updates });
  }

  destroy(id) {
    AppDispatcher.emit(todoCategoryEvents.DESTROY, { id: id });
  }
}
export default new TodoCategoryActions();
