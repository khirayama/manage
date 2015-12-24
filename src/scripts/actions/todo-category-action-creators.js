import appDispatcher from '../dispatchers/app-dispatcher';
import todoCategoryStorage from '../storages/todo-category-storage';
import { actionTypes as types } from '../constants/constants';


export function getTodoCategories() {
  const allTodoCategories = todoCategoryStorage.order('order').get();

  appDispatcher.emit(types.GET_ALL_TODO_CATEGORIES, allTodoCategories);
}

export function createTodoCategory(name) {
  const order = todoCategoryStorage.all().length;
  const entity = todoCategoryStorage.create({
    name,
    order,
  });

  appDispatcher.emit(types.CREATE_TODO_CATEGORY, entity);
}

export function editTodoCategory(id, name) {
  const entity = todoCategoryStorage.update(id, { name });

  appDispatcher.emit(types.EDIT_TODO_CATEGORY, entity);
}

export function deleteTodoCategory(id) {
  todoCategoryStorage.destroy(id);
  appDispatcher.emit(types.DELETE_TODO_CATEGORY, id);
}
