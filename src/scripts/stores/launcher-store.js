import MicroStore from './micro-store';

import { actionTypes as types } from '../constants/constants';
import appDispatcher from '../dispatchers/app-dispatcher';


export default class LauncherStore extends MicroStore {
  constructor() {
    super();

    this._isLauncherShowing = false;
    this._contents = [];

    this.register(appDispatcher, types.GET_LAUNCHER_CONTENTS, contents => {
      this.setContents(contents);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.SHOW_LAUNCHER, contents => {
      this.setContents(contents);
      this.showLauncher();
      this.dispatchChange();
    });
    this.register(appDispatcher, types.HIDE_LAUNCHER, () => {
      this.hideLauncher();
      this.dispatchChange();
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
