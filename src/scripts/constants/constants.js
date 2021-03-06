export const keyCodes = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  K: 75,
};

export const pages = {
  TASKS: 'TASK_PAGE',
  SETTINGS: 'SETTINGS_PAGE',
  HELP: 'HELP_PAGE',
};

export const EVENT_CHANGE = 'CHANGE_STORE';

export const actionTypes = {
  // FOR_APP
  BACK_PAGE: 'BACK_PAGE',
  CHANGE_PAGE: 'CHANGE_PAGE',
  // FOR_TASK
  GET_ALL_TASKS: 'GET_ALL_TASKS',
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  // FOR_TASK_CATEGORY
  GET_ALL_TASK_CATEGORIES: 'GET_ALL_TASK_CATEGORIES',
  CREATE_TASK_CATEGORY: 'CREATE_TASK_CATEGORY',
  UPDATE_TASK_CATEGORY: 'UPDATE_TASK_CATEGORY',
  EDIT_TASK_CATEGORY: 'EDIT_TASK_CATEGORY',
};

export const initialTaskCategoryNames = {
  TODAY: 'TODAY',
  LATER: 'LATER',
  SCHEDULE: 'SCHEDULE',
};

export const messages = {
  CONFIRM_DELETE_TASK_CATEGORY: 'This category has tasks. Delete this category?',
};
