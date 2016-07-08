import { dispatch, subscribe } from '../libs/app-dispatcher';
import { actionTypes as types } from '../constants/constants';

subscribe((event) => {
  switch (event.type) {
    case 'UI_CLICK_SETTINGS_BUTTON_IN_HEADER':
      changePage(event.link);
      break;
    case 'UI_CLICK_PAGE_BACK_BUTTON_IN_PAGE_BACK_BUTTON':
      backPage();
      break;
    default:
      break;
  }
});


export function changePage(page) {
  dispatch({
    type: types.CHANGE_PAGE,
    page: page,
  });
}

export function backPage() {
  dispatch({
    type: types.BACK_PAGE,
  });
}
