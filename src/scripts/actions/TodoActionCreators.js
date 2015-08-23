import AppDispatcher from '../dispatchers/AppDispatcher';
import {TODO, TODO_CATEGORY} from '../constants/constants';

// TODO: I want to work actions and stores in worker thread.
const TodoActionCreators = {
  create: (text) => {
    AppDispatcher.dispatch(TODO.CREATE, {
      entity: {
        text: text,
        category: TODO_CATEGORY.TODAY
      }
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
