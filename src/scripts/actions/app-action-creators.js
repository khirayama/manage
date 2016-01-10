import appDispatcher from '../dispatchers/app-dispatcher';
import todoCategoryStorage from '../storages/todo-category-storage';
import { pages, actionTypes as types } from '../constants/constants';

export function changePage(page) {
  appDispatcher.emit(types.CHANGE_PAGE, page);
}

export function backPage() {
  appDispatcher.emit(types.BACK_PAGE);
}

export function getLauncherContents() {
  const todoCategoryItems = todoCategoryStorage.all();

  const pageItems = Object.keys(pages).map(key => {
    const name_ = pages[key].replace(/_/g, ' ').toLowerCase();
    const name = name_.charAt(0).toUpperCase() + name_.slice(1);
    const href = pages[key];

    return { name, href };
  });

  appDispatcher.emit(types.GET_LAUNCHER_CONTENTS, {
    todoCategories: todoCategoryItems,
    pages: pageItems,
  });
}

export function showLauncher() {
  appDispatcher.emit(types.SHOW_LAUNCHER);
}

export function hideLauncher() {
  appDispatcher.emit(types.HIDE_LAUNCHER);
}

export function toggleLauncher(isLauncherShowing) {
  if (isLauncherShowing) {
    appDispatcher.emit(types.HIDE_LAUNCHER);
  } else {
    appDispatcher.emit(types.SHOW_LAUNCHER);
  }
}
