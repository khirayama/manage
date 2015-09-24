export default class Dispatcher {
  constructor() {
    this._events = {};
  }

  addListener(event, callback) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(callback);
  }

  /* Alias of addListener */
  on(event, callback) {
    this.addListener(event, callback);
  }

  removeListener(event, callback) { // alias
    if (event in this._events === false) return;
    this._events[event].splice(this._events[event].indexOf(callback), 1);
  }

  /* Alias of removeListener */
  off(event, callback) {
    this.removeListener(event, callback);
  }

  emit(event, payload) {
    if (event in this._events === false) return;
    for (let i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(this, [payload]);
    }
  }

  /* Alias of emit */
  dispatch(event, payload) {
    this.emit(event, payload);
  }

  once(event, callback) {
  }
}

