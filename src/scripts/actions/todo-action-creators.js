import appDispatcher from '../dispatchers/app-dispatcher';
import todoStorage from '../storages/todo-storage';
import todoCategoryStorage from '../storages/todo-category-storage';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema.js';
import todoStorageSchema from '../json-schemas/todo-storage.json';


export function getTodos() {
  const todos = [];

  const allTodoCategories = todoCategoryStorage.order('order').get();

  allTodoCategories.forEach(todoCategory => {
    todos.push({
      categoryName: todoCategory.name,
      categoryId: todoCategory.id,
      todos: todoStorage.where({ categoryId: todoCategory.id }).order('order').get(),
    });
  });

  todos.forEach(todoCategory => {
    todoCategory.todos.forEach(todo => {
      validateByJSONSchema(todo, todoStorageSchema);
      todo.isEditing = false;
    });
  });

  appDispatcher.emit(types.GET_ALL_TODOS, todos);
}

export function createTodo(text, categoryId) {
  const entity = todoStorage.create({
    text,
    categoryId,
  });

  validateByJSONSchema(entity, todoStorageSchema);

  entity.isEditing = true;

  appDispatcher.emit(types.CREATE_TODO, entity);
}

export function completeTodo(id) {
  const todo = todoStorage.get(id);
  const entity = todoStorage.update(todo.id, {
    completed: !todo.completed,
  });

  validateByJSONSchema(entity, todoStorageSchema);

  appDispatcher.emit(types.COMPLETE_TODO, entity);
}

export function editTodo(id) {
  const todo = todoStorage.get(id);
  const entity = Object.assign({}, todo, {
    isEditing: true,
  });

  validateByJSONSchema(entity, todoStorageSchema);

  appDispatcher.emit(types.EDIT_TODO, entity);
}

export function updateTodo(id, text) {
  const entity = todoStorage.update(id, { text });

  validateByJSONSchema(entity, todoStorageSchema);

  entity.isEditing = false;

  appDispatcher.emit(types.EDIT_TODO, entity);
}

export function deleteTodo(id) {
  todoStorage.destroy(id);
  appDispatcher.emit(types.DELETE_TODO, id);
}
