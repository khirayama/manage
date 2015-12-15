import MicroEmitter from 'micro-emitter';
import AppDispatcher from '../dispatchers/AppDispatcher';

class TodoStore extends MicroEmitter {
  constructor() {
    this.register(AppDispatcher, {
      [todoCategoryEvents.CREATE]: (payload) => {
        this.create(payload.entity);
      },
      [todoCategoryEvents.UPDATE]: (payload) => {
        this.update(payload.id, payload.updates);
      },
      [todoCategoryEvents.DESTROY]: (payload) => {
        this.destroy(payload.id);
      },
    });
    this.init();
  }

  // basic method
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
