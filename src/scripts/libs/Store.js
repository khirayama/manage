import 'babel/polyfill';
import Dispatcher from './Dispatcher';

const CHANGE_EVENT = 'CHANGE';

export default class Store extends Dispatcher {
  constructor() {
    super();
    // this._data = this._load || {};
    this._data = {};
  }

  // crud method
  _create(entity) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this._data[id] = Object.assign({}, {id: id}, this.default, entity);
    this.dispatchChange();
    // this._save();
  }
  _update(id, updates) {
    this._data[id] = Object.assign({}, this._data[id], updates);
    this.dispatchChange();
    // this._save();
  }
  _destroy(id) {
    delete this._data[id];
    this.dispatchChange();
    // this._save();
  }
  _save() {
    localStorage.setItem('_todos', JSON.stringify(this._todos));
    this.dispatchChange();
  }
  _load() {
    return JSON.parse(localStorage.getItem('_todos'));
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

// indexeddb
class DataBase {
  constructor(dbName, version) {
    this.DB_VERSION = version || 1.0;
    this.DB_NAME = dbName;
    this.DB_STORE_NAME = '';
    this._db = null;

    this._indexedDB = (window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB);
    if(!(this._indexedDB)) throw new Error('IndexedDB not supported.');
  }
  open(storeName, callback) {
    let request = this._indexedDB.open(this.DB_NAME, this.DB_VERSION);

    this.DB_STORE_NAME = storeName;
    request.onupgradeneeded = (event) => {
      this._db = event.target.result;
      this._db.createObjectStore(this.DB_STORE_NAME, {keyPath: 'id', autoIncrement: true});
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
  create(todo, callback) {
    if(!(this._db)) return;

    let transaction = this._db.transaction(this.DB_STORE_NAME, 'readwrite');
    let store = transaction.objectStore(this.DB_STORE_NAME);
    let request = store.put(todo);

    request.onsuccess = (event) => {
      todo.id = event.target.result;
      if(callback) callback(null, todo);
    };
    request.onerror = event => {if(callback) callback(event, todo)};
  }
  delete(id, callback) {
    if(!(this._db)) return;

    let transaction = this._db.transaction(this.DB_STORE_NAME, 'readwrite');
    let store = transaction.objectStore(this.DB_STORE_NAME);
    let request = store.delete(id);

    request.onsuccess = (event) => {
      if(callback) callback(null, id);
    };
    request.onerror = event => {if(callback) callback(event, id)};
  }
  getAll(callback) {
    if(!(this._db)) return;

    let transaction = this._db.transaction(this.DB_STORE_NAME, 'readonly');
    let store = transaction.objectStore(this.DB_STORE_NAME);
    let request = store.openCursor();
    let _data = [];

    request.onsuccess = (event) => {
      var cursor = event.target.result;
      if(cursor) {
        _data.push(cursor.value);
        cursor.continue();
      } else if (callback) {
        callback(null, _data);
      }
    };
    request.onerror = event => {if(callback) callback(event)};
  }
  clear(callback) {
    if(!(this._db)) return;

    let transaction = this._db.transaction(this.DB_STORE_NAME, 'readwrite');
    let store = transaction.objectStore(this.DB_STORE_NAME);
    let request = store.clear();

    request.onsuccess = (event) => {
      if(callback) callback(null);
    };
    request.onerror = (event) => {
      if(callback) callback(event);
    };
  }
  dispose(callback) {
    if(!(this._db)) return;
    this._db.close();

    let request = this._indexedDB.deleteDatabase(this.DB_NAME);
    request.onsuccess = (event) => {
      this._db = null;
      if(callback) callback();
    };
    request.onerror = (event) => {
      if(callback) callback(event);
    };
  };
};

let db = new DataBase('data');
db.open('todo', (error) => {
  db.create({text: 'test', completed: false});
  db.getAll((error, data) => {
    console.log(data);
  });
});
