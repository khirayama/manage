import AppDispatcher from '../dispatchers/AppDispatcher';
import { TODO } from '../constants/constants';

// TODO: I want to work actions and stores in worker thread.
const TodoActionCreators = {
  create: (entity) => {
    AppDispatcher.dispatch(TODO.CREATE, {
      entity: entity
    });
  },
  update: (id, updates) => {
    AppDispatcher.dispatch(TODO.UPDATE, {
      id: id,
      updates: updates
    });
  },
  destroy: (id) => {
    AppDispatcher.dispatch(TODO.DESTROY, {
      id: id
    });
  }
};
export default TodoActionCreators;
