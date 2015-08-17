import 'babel/polyfill';
import Dispatcher from 'TinyDispatcher';
import AppDispatcher from '../dispatchers/AppDispatcher';

const CHANGE_EVENT = 'CHANGE';

export default class BaseStore extends EventDispatcher {
  constructor() {
    super();
    this._data = this._load || {};
  }

  // crud method
  _create(creates) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this._data[id] = Object.assign({}, {id: id}, this.default, creates);
    this._save();
  }
  _update(id, updates) {
    this._data[id] = Object.assign({}, this._data[id], updates);
    this._save();
  }
  _destroy(id) {
    delete this._data[id];
    this._save();
  }
  _save() {
    localStorage.setItem('_todos', JSON.stringify(this._todos));
    this.dispatchChange();
  }
  _load() {
    return JSON.parse(localStorage.getItem('_todos'));
  }
  getAll() {
    let data = [];

    for (let id in this._data) {
      data.push(this._data[id]);
    }
    return data;
  }
  get(id) {
    if (id) return this._data[id];
    return this.getAll();
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
  register(actions) {
    for (let key in actions) {
      let action = actions[key];
      AppDispatcher.on(key, (data) => {
        action(data);
      });
    }
  }
}

