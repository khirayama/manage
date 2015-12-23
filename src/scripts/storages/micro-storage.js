if (global) global.localStorage = global.localStorage || { getItem: () => { return '{}'; }, setItem: () => {} };

function _o2a(obj) {
  const arr = [];

  for (const key in obj) {
    if (!key) break;
    arr.push(obj[key]);
  }
  return arr;
}

export default class MicroStorage {
  constructor(options = { localStorage: true }) {
    this._localStorage = options.localStorage;
    this._data = (this._localStorage) ? this._load() || {} : {};
    this._filteredData = [];
    this._filtering = false;
    this.defaults = {};
  }

  // CRUD method
  create(entity) {
    const now = new Date();
    const id = (+now + Math.floor(Math.random() * 999999)).toString(36);

    this._data[id] = Object.assign({}, { id, createdAt: now, updatedAt: now }, this.defaults, entity);
    if (this._localStorage) this._save();
    return this._data[id];
  }

  update(id, updates) {
    const now = new Date();
    this._data[id] = Object.assign({ updatedAt: now }, this._data[id], updates);
    if (this._localStorage) this._save();
    return this._data[id];
  }

  destroy(id) {
    delete this._data[id];
    if (this._localStorage) this._save();
  }

  drop() {
    this._data = {};
    this._filteredData = [];
    this._filtering = false;
    if (this._localStorage) this._save();
  }

  get(id) {
    if (id) return this._data[id];
    this._filtering = false;
    return _o2a(this._filteredData);
  }

  all() {
    return _o2a(this._data);
  }

  _save() {
    const key = this.constructor.name;

    localStorage.setItem(key, JSON.stringify(this._data));
  }

  _load() {
    const key = this.constructor.name;

    return JSON.parse(localStorage.getItem(key));
  }

  where(statement) {
    if (!this._filtering) {
      this._filtering = true;
      this._filteredData = _o2a(this._data);
    }

    const data = [];
    for (const id in this._filteredData) {
      if (!id) break;
      const _data = this._filteredData[id];

      for (const key in statement) {
        if (!key) break;
        const value = statement[key];
        if (_data[key] === value) data.push(_data);
      }
    }
    this._filteredData = data;
    return this;
  }

  order(key, reverse = false) {
    if (!this._filtering) {
      this._filtering = true;
      this._filteredData = _o2a(this._data);
    }

    this._filteredData.sort((itemA, itemB) => {
      const valueX = itemA[key];
      const valueY = itemB[key];

      if (reverse) {
        if (valueX > valueY) return -1;
        if (valueX < valueY) return 1;
        return 0;
      }
      if (valueX > valueY) return 1;
      if (valueX < valueY) return -1;
      return 0;
    });
    return this;
  }

  limit(num) {
    if (!this._filtering) {
      this._filtering = true;
      this._filteredData = _o2a(this._data);
    }

    const data = [];
    for (let index = 0; index < num; index++) {
      data.push(this._filteredData[index]);
    }
    this._filteredData = data;
    return this;
  }
}
