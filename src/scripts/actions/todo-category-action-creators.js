import appDispatcher from '../dispatchers/app-dispatcher';
import todoCategoryStorage from '../storages/todo-category-storage';
import { actionTypes as types } from '../constants/constants';
import {
  getTodos,
} from './todo-action-creators';


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

  entity.isEditing = true;

  getTodos();
  appDispatcher.emit(types.CREATE_TODO_CATEGORY, entity);
}

export function editTodoCategory(id) {
  appDispatcher.emit(types.EDIT_TODO_CATEGORY, id);
}

export function updateTodoCategory(id, name) {
  const entity = todoCategoryStorage.update(id, { name });

  entity.isEditing = false;

  getTodos();
  appDispatcher.emit(types.UPDATE_TODO_CATEGORY, entity);
}

export function deleteTodoCategory(id) {
  todoCategoryStorage.destroy(id);
  getTodos();
  appDispatcher.emit(types.DELETE_TODO_CATEGORY, id);
}
