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
let IDB = function () {
  let _db = null;
  const DB_NAME = 'data';
  const DB_VERSION = 1.0;
  const DB_STORE_NAME = 'todo';

  let _indexedDB = (window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB);
  if(!(_indexedDB)) throw new Error( 'IndexedDB not supported.' );

  this.open = (callback) => {
    let request = _indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      console.log('DB [oepn]: Success, Upgrade');
      _db = event.target.result;
      _db.createObjectStore(DB_STORE_NAME, {keyPath: 'id', autoIncrement: true});
      event.target.transaction.oncomplete = () => {
        if(callback) callback();
      };
    };
    request.onsuccess = (event) => {
      console.log('DB [ oepn ]: Success');
      _db = event.target.result;
      if(callback) callback();
    };
    request.onerror = (event) => {
      console.log('DB [ oepn ]: Error, ' + event);
      if(callback) callback(event);
    };
  };
  this.addItem = (todo, callback) => {
    if(!(_db)) return;

    let transaction = _db.transaction(DB_STORE_NAME, 'readwrite');
    let store = transaction.objectStore(DB_STORE_NAME);
    console.log(todo);
    let request = store.put(todo);

    request.onsuccess = (event) => {
      todo.id = event.target.result;
      if(callback) callback(null, todo);
    };
    request.onerror = (event) => {
      console.log(event);
      if(callback) callback(event, todo);
    };
  };
  this.deleteItem = (id, callback) => {
    if(!(_db)) return;

    let transaction = _db.transaction(DB_STORE_NAME, 'readwrite');
    let store = transaction.objectStore(DB_STORE_NAME);
    let request = store.delete(id);

    request.onsuccess = (event) => {
      if(callback) callback(null, id);
    };
    request.onerror = (event) => {
      if(callback) callback(event, id);
    };
  };
  this.readAll = (callback) => {
    if(!(_db)) return;

    let transaction = _db.transaction(DB_STORE_NAME, 'readonly');
    let store = transaction.objectStore(DB_STORE_NAME);
    let request = store.openCursor();
    let todos = [];

    request.onsuccess = (event) => {
      var cursor = event.target.result;
      if(cursor) {
        todos.push(cursor.value);
        cursor.continue();
      } else if (callback) {
        callback(null, todos);
      }
    };
    request.onerror = (event) => {
      if(callback) callback(event);
    };
  };
  this.clear = (callback) => {
    if(!(_db)) return;

    let transaction = _db.transaction(DB_STORE_NAME, 'readwrite');
    let store = transaction.objectStore(DB_STORE_NAME);
    let request = store.clear();

    request.onsuccess = (event) => {
      if(callback) callback(null);
    };
    request.onerror = (event) => {
      console.log(event);
      if(callback) callback(event);
    };
  };
  this.dispose = (callback) => {
    if(!(_db)) return;
    _db.close();

    let request = _indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = (event) => {
      console.log('DB [ dispose ]: Success');

      _db = null;
      if(callback) callback();
    };
    request.onerror = (event) => {
      console.log('DB [ dispose ]: Error, ' + e);
      if(callback) callback(event);
    };
  };
};

let db = new IDB();
db.open(() => {
  db.addItem({text: 'test', completed: false});
  db.readAll();
});
