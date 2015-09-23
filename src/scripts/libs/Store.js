import 'babel/polyfill';
import Dispatcher from './Dispatcher';

const changeEvent = 'CHANGE';
// FIXME: for test...
let localStorage;
let window;
if (!window) localStorage = localStorage || {getItem: () => { return '{}'; }, setItem: () => {}};

export default class Store extends Dispatcher {
  constructor() {
    super();
    this._data = this._load() || {};
    this._tmp = [];
    this._filtering = false;
    this.defaults = {};
  }

  // CRUD method
  create(entity) {
    const now = new Date();
    const id = (+now + Math.floor(Math.random() * 999999)).toString(36);

    this._data[id] = Object.assign({}, { id: id, createdAt: now, updatedAt: now }, this.defaults, entity);
    this.dispatchChange();
    this._save();
  }

  update(id, updates) {
    const now = new Date();
    this._data[id] = Object.assign({ updatedAt: now }, this._data[id], updates);
    this.dispatchChange();
    this._save();
  }

  destroy(id) {
    delete this._data[id];
    this.dispatchChange();
    this._save();
  }

  _getAll() {
    let data = [];
    let targetData;

    if (this._filtering) {
      this._filtering = false;
      targetData = this._tmp;
    } else {
      targetData = this._data;
    }
    data = this._o2a(targetData);
    return data;
  }

  get(id) {
    if (id) return this._data[id];
    return this._getAll();
  }

  _save() {
    const key = this.constructor.name;

    localStorage.setItem(key, JSON.stringify(this._data));
  }

  _load() {
    const key = this.constructor.name;

    return JSON.parse(localStorage.getItem(key));
  }

  // public methods
  order(key, reverse) {
    if (!this._filtering) {
      this._filtering = true;
      this._tmp = this._o2a(this._data);
    }

    this._tmp.sort((a, b) => {
      const x = a[key];
      const y = b[key];

      if (reverse) {
        if (x > y) return -1;
        if (x < y) return 1;
        return 0;
      }
      if (x > y) return 1;
      if (x < y) return -1;
      return 0;
    });
    return this;
  }

  where(statement) {
    if (!this._filtering) {
      this._filtering = true;
      this._tmp = this._o2a(this._data);
    }

    const data = [];
    for (const id in this._tmp) {
      if (!id) break;
      const _data = this._tmp[id];

      for (const key in statement) {
        if (!key) break;
        const value = statement[key];
        if (_data[key] === value) data.push(_data);
      }
    }
    this._tmp = data;
    return this;
  }

  limit(num) {
    if (!this._filtering) {
      this._filtering = true;
      this._tmp = this._o2a(this._data);
    }

    const data = [];
    for (let i = 0; i < num; i++) {
      data.push(this._tmp[i]);
    }
    this._tmp = data;
    return this;
  }

  _o2a(obj) {
    const arr = [];

    for (const key in obj) {
      if (!key) break;
      arr.push(obj[key]);
    }
    return arr;
  }

  _checkType(target) {
    const _type = toString.call(target);

    switch (_type) {
    case '[object Object]':
      return 'Object';
    case '[object Array]':
      return 'Array';
    case '[object Boolean]':
      return 'Boolean';
    case '[object Function]':
      return 'Function';
    case '[object Date]':
      return 'Date';
    case '[object JSON]':
      return 'JSON';
    case '[object String]':
      return 'String';
    case '[object Number]':
      return 'Number';
    default:
      break;
    }
  }

  // basic method
  dispatchChange() {
    this.dispatch(changeEvent);
  }

  dispatchCustomEvent(eventType) {
    this.dispatch(eventType);
  }

  addChangeListener(callback) {
    this.on(changeEvent, callback);
  }

  addCustomEventListener(eventType, callback) {
    this.on(eventType, callback);
  }

  removeChangeListener(callback) {
    this.off(changeEvent, callback);
  }

  register(dispatcher, actions) {
    // FIXME: I wan't create a function in for-block.
    for (const key in actions) {
      if (!key) break;
      const action = actions[key];

      dispatcher.on(key, (data) => {
        action(data);
      });
    }
  }
}
