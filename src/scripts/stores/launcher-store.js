import MicroStore from './micro-store';

import appDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';


export default class LauncherStore extends MicroStore {
  constructor() {
    super();

    this._isLauncherShowing = false;
    this._contents = [];

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

  getContents() {
    return this._contents;
  }

  setContents(contents) {
    this._contents = contents;
  }

  showLauncher() {
    this._isLauncherShowing = true;
  }

  hideLauncher() {
    this._isLauncherShowing = false;
  }
}
