import AppDispatcher from '../dispatchers/AppDispatcher';
import { todoEvents } from '../constants/constants';

class TodoActionCreators {
  create(entity) {
    AppDispatcher.dispatch(todoEvents.CREATE, { entity: entity });
  }

  update(id, updates) {
    AppDispatcher.dispatch(todoEvents.UPDATE, { id: id, updates: updates });
  }

  destroy(id) {
    AppDispatcher.dispatch(todoEvents.DESTROY, { id: id });
  }
}
export default new TodoActionCreators();
