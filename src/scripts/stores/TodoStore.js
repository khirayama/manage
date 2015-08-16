import 'babel/polyfill';
import Store from './Store';

class PaymentCategoryStore extends Store {
  constructor() {
    super();
    this._todos = {};
  }
  _create(text) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this._paymentCategories[id] = {
      id: id,
      name: name,
      budgetType: budgetType || BUDGET_TYPE.DAILY,
      budget: budget || 0
    };
    this._save();
  }
  _update(id, updates) {
    this._paymentCategories[id] = Object.assign({}, this._paymentCategories[id], updates);
    this._save();
  }
  _destroy(id) {
    delete this._paymentCategories[id];
    this._save();
  }
  getAll() {
    let paymentCategories = [];
    for (let id in this._paymentCategories) {
      if (!{}.hasOwnProperty.call(this._paymentCategories, id)) return false;
      paymentCategories.push(this._paymentCategories[id]);
    }
    return paymentCategories;
  }
  getById(id) {
    return this._paymentCategories[id];
  }
  getBudgetType() {
    return BUDGET_TYPE;
  }
  _save() {
    localStorage.setItem('_paymentCategories', JSON.stringify(this._paymentCategories));
  }
  _load() {
    return JSON.parse(localStorage.getItem('_paymentCategories'));
  }
}
export default new PaymentCategoryStore();
