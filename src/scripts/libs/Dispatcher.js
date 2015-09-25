export default class Dispatcher {
  constructor() {
    this._events = {};
  }

  addListener(event, callback) {
    this._addListener(event, callback, false);
  }

  /* Alias of addListener */
  on(event, callback) {
    this.addListener(event, callback);
  }

  removeListener(event, callback) { // alias
    if (!this._events[event].length) return;
    for (let i = 0; i < this._events[event].length; i++) {
      if (this._events[event][i].callback === callback) this._events[event].splice(i, 1);
    }
  }

  /* Alias of removeListener */
  off(event, callback) {
    this.removeListener(event, callback);
  }

  emit(event, payload) {
    if (!this._events[event]) return;
    for (let i = 0; i < this._events[event].length; i++) {
      this._events[event][i].callback.apply(this, [payload]);
      if (this._events[event][i].once) this._events[event].splice(i, 1);
    }
  }

  /* Alias of emit */
  dispatch(event, payload) {
    this.emit(event, payload);
  }

  once(event, callback) {
    this._addListener(event, callback, true);
  }

  _addListener(event, callback, once) {
    this._events[event] = this._events[event] || [];
    this._events[event].push({ callback: callback, once: once });
  }
}

