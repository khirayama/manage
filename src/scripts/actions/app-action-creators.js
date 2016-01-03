import appDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';

export function changePage(page) {
  appDispatcher.emit(types.CHANGE_PAGE, page);
}

export function backPage() {
  appDispatcher.emit(types.BACK_PAGE);
}
