export const keyCodes = {
  ENTER: 13
};

export const EVENT_CHANGE = 'CHANGE_STORE';

export const actionTypes = {
  // FOR_TODO
  GET_ALL_TODOS: 'GET_ALL_TODOS',
  CREATE_TODO: 'CREATE_TODO',
  COMPLETE_TODO: 'COMPLETE_TODO',
  EDIT_TODO: 'EDIT_TODO',
  DELETE_TODO: 'DELETE_TODO',
  // FOR_TODO_CATEGORY
  GET_ALL_TODO_CATEGORIES: 'GET_ALL_TODO_CATEGORIES',
  CREATE_TODO_CATEGORY: 'CREATE_TODO_CATEGORY',
  EDIT_TODO_CATEGORY: 'EDIT_TODO_CATEGORY',
  UPDATE_TODO_CATEGORY: 'UPDATE_TODO_CATEGORY',
  DELETE_TODO_CATEGORY: 'DELETE_TODO_CATEGORY',
};

export const initialTodoCategoryNames = {
  TODAY: 'TODAY',
  LATER: 'LATER',
  SCHEDULE: 'SCHEDULE',
};
