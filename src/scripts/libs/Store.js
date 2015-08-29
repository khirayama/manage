import 'babel/polyfill';
import Dispatcher from './Dispatcher';

const CHANGE_EVENT = 'CHANGE';

export default class Store extends Dispatcher {
  constructor() {
    super();
    this._data = {};
    this.default = {};
  }

  // crud method
  _create(entity) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this._data[id] = Object.assign({}, {id: id}, this.default, entity);
    this.dispatchChange();
  }
  _update(id, updates) {
    this._data[id] = Object.assign({}, this._data[id], updates);
    this.dispatchChange();
  }
  _destroy(id) {
    delete this._data[id];
    this.dispatchChange();
  }
  _getAll() {
    let data = [];

    for (let id in this._data) {
      data.push(this._data[id]);
    }
    return data;
  }
  get(id) {
    if (id) return this._data[id];
    return this._getAll();
  }

  // basic method
  dispatchChange() {
    this.dispatch(CHANGE_EVENT);
  }
  dispatchCustomEvent(eventType) {
    this.dispatch(eventType);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  addCustomEventListener(eventType, callback) {
    this.on(eventType, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  register(dispatcher, actions) {
    // FIXME: I wan't create a function in for-block.
    for (let key in actions) {
      let action = actions[key];
      dispatcher.on(key, (data) => {
        action(data);
      });
    }
  }
}
