import MicroStore from './micro-store';

import logger from '../utils/logger';
import appDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';


export default class LauncherStore extends MicroStore {
  constructor() {
    super();

    this._isLauncherShowing = false;
    this._todoCategories = [];
    this._pages = [];

    this.register(appDispatcher, {
      [types.GET_LAUNCHER_CONTENTS]: contents => {
        this.setContents(contents);
        this.dispatchChange();
      },
      [types.SHOW_LAUNCHER]: () => {
        this.showLauncher();
        this.dispatchChange();
      },
      [types.HIDE_LAUNCHER]: () => {
        this.hideLauncher();
        this.dispatchChange();
      },
    });
  }

  getLauncherShowing() {
    return this._isLauncherShowing;
  }

  getTodoCategories() {
    return this._todoCategories;
  }

  getPages() {
    return this._pages;
  }

  setContents({ todoCategories, pages }) {
    this._todoCategories = todoCategories;
    this._pages = pages;
  }

  showLauncher() {
    this._isLauncherShowing = true;
  }

  hideLauncher() {
    this._isLauncherShowing = false;
  }
}

