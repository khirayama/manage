import appDispatcher from '../dispatchers/app-dispatcher';
import todoStorage from '../storages/todo-storage';

const types = {
  CREATE_TODO: 'CREATE_TODO'
  COMPLETE_TODO: 'COMPLETE_TODO',
  EDIT_TODO: 'EDIT_TODO',
  DELETE_TODO: 'DELETE_TODO',
}

export function createTodo(text, categoryId) {
  const entity = todoStorage.create({
    text,
    categoryId,
  });

  appDispatcher.emit(types.CREATE_TODO, entity);

  return entity;
}

export function completeTodo(id) {
  const todo = todoStorage.get(id);
  const entity = todoStorage.update(todo.id, {
    completed: !todo.completed,
  });

  appDispatcher.emit(types.COMPLETE_TODO, entity);

  return entity;
}

export function editTodo(id, text) {
  const todo = todoStorage.get(id);
  const entity = todoStorage.update(todo.id, { text });

  appDispatcher.emit(types.EDIT_TODO, entity);

  return entity;
}

export function deleteTodo(id) {
  todoStorage.destroy(id);
  appDispatcher.emit(types.DELETE_TODO, { id });

  return null;
}
