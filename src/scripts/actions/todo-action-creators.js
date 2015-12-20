import AppDispatcher from '../dispatchers/AppDispatcher';
import { todoEvents } from '../constants/constants';

class TodoActions {
  create(entity) {
    AppDispatcher.emit(todoEvents.CREATE, { entity: entity });
  }

  update(id, updates) {
    AppDispatcher.emit(todoEvents.UPDATE, { id: id, updates: updates });
  }

  destroy(id) {
    AppDispatcher.emit(todoEvents.DESTROY, { id: id });
  }
}
export default new TodoActions();
