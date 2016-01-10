import appDispatcher from '../dispatchers/app-dispatcher';
import todoCategoryStorage from '../storages/todo-category-storage';
import {
  actionTypes as types,
  pages,
  launcherContentTypes,
} from '../constants/constants';

export function changePage(page) {
  appDispatcher.emit(types.CHANGE_PAGE, page);
}

export function backPage() {
  appDispatcher.emit(types.BACK_PAGE);
}

export function getLauncherContents() {
  const todoCategoryItems = todoCategoryStorage.order('order').get().map(todoCategory => {
    const type = launcherContentTypes.TODO;
    const id = todoCategory.id;
    const name = todoCategory.name;
    const text = `Create a todo to ${ todoCategory.name }`;

    return { type, id, name, text };
  });

  const createCategoryItem = {
    type: launcherContentTypes.TODO_CATEGORY,
    text: 'Create a category',
  };

  const pageItems = Object.keys(pages).map(key => {
    const type = launcherContentTypes.PAGE;
    const name_ = pages[key].replace(/_/g, ' ').toLowerCase();
    const name = name_.charAt(0).toUpperCase() + name_.slice(1);
    const href = pages[key];
    const text = `Move to ${name}`;

    return { type, name, href, text };
  });

  const contents = [...todoCategoryItems, createCategoryItem, ...pageItems];

  appDispatcher.emit(types.GET_LAUNCHER_CONTENTS, contents);
}

export function showLauncher() {
  appDispatcher.emit(types.SHOW_LAUNCHER);
}

export function hideLauncher() {
  appDispatcher.emit(types.HIDE_LAUNCHER);
}
