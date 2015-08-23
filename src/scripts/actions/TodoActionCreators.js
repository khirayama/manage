import AppDispatcher from '../dispatchers/AppDispatcher';
import {TODO, TODO_CATEGORY} from '../constants/constants';

const TodoActionCreators = {
  create: (text) => {
    AppDispatcher.dispatch(TODO.CREATE, {
      text: text,
      category: TODO_CATEGORY.TODAY
    });
  }
};
export default TodoActionCreators;
