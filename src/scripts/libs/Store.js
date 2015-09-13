import 'babel/polyfill';
import Dispatcher from './Dispatcher';

const changeEvent = 'CHANGE';
// const localStorage = localStorage || {getItem: () => { return '{}'; }, setItem: () => {}}; // for test

export default class Store extends Dispatcher {
  constructor() {
    super();
    this._data = this._load() || {};
    this._tmp = [];
    this._filtering = false;
    this.defaults = {};
  }

  // crud method
  create(entity) {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    this._data[id] = Object.assign({}, { id: id }, this.defaults, entity);
    this.dispatchChange();
    this._save();
  }

  update(id, updates) {
    this._data[id] = Object.assign({}, this._data[id], updates);
    this.dispatchChange();
    this._save();
  }

  destroy(id) {
    delete this._data[id];
    this.dispatchChange();
    this._save();
  }

  _getAll() {
    const data = [];
    let targetData;

    if (this._filtering) {
      this._filtering = false;
      targetData = this._tmp;
    } else {
      targetData = this._data;
    }

    for (const id in targetData) {
      if (!id) break;
      const _data = this._resolveAssociation(targetData[id].id);

      data.push(_data);
    }
    return data;
  }

  get(id) {
    if (id) return this._resolveAssociation(id);
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

  // association
  _resolveAssociation(id) {
    const _data = Object.assign({}, this._data[id]);
    if (this.association && this.association.length) {
      for (const index in this.association) {
        if (!index) break;
        const association = this.association[index];
        // TODO: support hasMany:sm, hasOne:ss, belongsTo:ms, hasAndBelongsToMany:mm
        switch (association.type) {
        case 'hasOne':
          _data[association.value] = association.store.get(_data[association.key]);
          delete _data[association.key];
          break;
        default:
          break;
        }
      }
    }
    return _data;
  }

  // public methods
  order(key, reverse) {
    // TODO: support association object key
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
    this.removeListener(changeEvent, callback);
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
