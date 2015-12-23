import MicroEmitter from 'micro-emitter';

import { EVENT_CHANGE } from '../constants/constants';

export default class MicroStore extends MicroEmitter {
  dispatchChange() {
    this.emit(EVENT_CHANGE);
  }

  dispatchCustomEvent(type) {
    this.emit(type);
  }

  addChangeListener(listener) {
    this.addListener(EVENT_CHANGE, listener);
  }

  removeChangeListener(listener) {
    this.removeListener(EVENT_CHANGE, listener);
  }

  addCustomEventListener(type, listener) {
    this.addListener(type, listener);
  }

  removeCustomEventListener(type, listener) {
    this.removeListener(type, listener);
  }

  register(dispatcher, actions) {
    for (const key in actions) {
      if (!key) break;
      const action = actions[key];

      dispatcher.addListener(key, (data) => {
        action(data);
      });
    }
  }
}
