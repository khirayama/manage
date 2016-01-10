import appDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';

export function changePage(page) {
  appDispatcher.emit(types.CHANGE_PAGE, page);
}

export function backPage() {
  appDispatcher.emit(types.BACK_PAGE);
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
