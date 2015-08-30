import 'babel/polyfill';
import Dispatcher from './Dispatcher';

const CHANGE_EVENT = 'CHANGE';

// ex)
// version is number.
// defined objects in constructor
// this.dafult = {};
// this.store = 'todo';
// new TodoStore('App', 'Todo', 0.1);

export default class DataStore extends Dispatcher {
  constructor(dbName, storeName, version) {
    super();

    this.DB_NAME = dbName;
    this.DB_STORE_NAME = storeName;
    this.DB_VERSION = version || 1.0;
    this._db = null;

    this._indexedDB = (window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB);
    if(!(this._indexedDB)) throw new Error('IndexedDB not supported.');

    this._data = this.__open(() => {
      this.__getAll((data) => {
        this._data = data || {};
        this.dispatchChange();
      });
    });
    this.default = {};
  }

  // db method
  __open(callback) {
    let request = this._indexedDB.open(this.DB_NAME, this.DB_VERSION);

    request.onupgradeneeded = (event) => {
      this._db = event.target.result;
      this._db.createObjectStore(this.DB_STORE_NAME, {keyPath: 'id', autoIncrement: true});
      console.log(this.default);
      event.target.transaction.oncomplete = () => {
        if(callback) callback();
      };
    };
    request.onsuccess = (event) => {
      this._db = event.target.result;
      if(callback) callback();
    };
    request.onerror = event => {if(callback) callback(event)};
  }
  __createOrUpdate(entity, callback) {
    let transaction = this._db.transaction(this.DB_STORE_NAME, 'readwrite');
    let store = transaction.objectStore(this.DB_STORE_NAME);
    let request = store.put(entity);

    request.onsuccess = (event) => {
      entity.id = event.target.result;
      if(callback) callback(entity);
    };
    request.onerror = (event) => {};
  }
  __destroy(id, callback) {
    let transaction = this._db.transaction(this.DB_STORE_NAME, 'readwrite');
    let store = transaction.objectStore(this.DB_STORE_NAME);
    let request = store.delete(id);

    request.onsuccess = (event) => {
      if(callback) callback(id);
    };
    request.onerror = event => {if(callback) callback(event, id)};
  }
  __getAll(callback) {
    let transaction = this._db.transaction(this.DB_STORE_NAME, 'readonly');
    let store = transaction.objectStore(this.DB_STORE_NAME);
    let request = store.openCursor();
    let _data = {};

    request.onsuccess = (event) => {
      var cursor = event.target.result;
      if(cursor) {
        _data[cursor.value.id] = cursor.value;
        cursor.continue();
      } else if (callback) {
        return callback(_data);
      }
    };
    request.onerror = event => {if(callback) callback(event)};
  }
  __get(id, callback) {
    let transaction = this._db.transaction(this.DB_STORE_NAME, 'readonly');
    let store = transaction.objectStore(this.DB_STORE_NAME);
    let request = store.get(id);

    req.onsuccess = (event) => {
      let _id = this.result.id;
      callback(_id);
    };
  }

  // crud method
  _create(entity) {
    let _entity = Object.assign({}, this.default, entity);

    this.__open(() => {
      this.__createOrUpdate(_entity, (__entity) => {
        this._data[__entity.id] = __entity;
        this.dispatchChange();
      });
    });
  }
  _update(id, updates) {
    let _updates = Object.assign({}, this._data[id], updates);

    this.__open(() => {
      this.__createOrUpdate(_updates, (__updates) => {
        this._data[__updates.id] = __updates;
        this.dispatchChange();
      });
    });
  }
  _destroy(id) {
    this.__open(() => {
      this.__destroy(id, (_id) => {
        delete this._data[_id];
        this.dispatchChange();
      });
    });
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
