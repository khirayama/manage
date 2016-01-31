import React, { Component } from 'react';

import {
  createTodoCategory,
  sortTodoCategories,
} from '../actions/todo-category-action-creators';
import TodoCategoryListItem from './todo-category-list-item';

const propTypes = {
  todoCategories: React.PropTypes.array.isRequired,
};

export default class TodoCategoryList extends Component {
  constructor(props) {
    super(props);

    this._initializeOrder();

    this.onClickAddButton = this.onClickAddButton.bind(this);
    this.setFromOrder = this.setFromOrder.bind(this);
    this.setToOrder = this.setToOrder.bind(this);
    this.moveTodoCategory = this.moveTodoCategory.bind(this);
  }

  onClickAddButton() {
    createTodoCategory('');
  }

  setFromOrder(from) {
    this._order.from = from;
  }

  setToOrder(to) {
    this._order.to = to;
  }

  moveTodoCategory() {
    if (this._order.from !== null && this._order.to !== null) {
      sortTodoCategories(this._order.from, this._order.to);
      this._initializeOrder();
    }
  }

  _initializeOrder() {
    this._order = {
      from: null,
      to: null,
    };
  }

  _createTodoCategoryListItemElement(todoCategory) {
    return (
      <TodoCategoryListItem
        key={ todoCategory.id }
        todoCategory={ todoCategory }
        setFromOrder={ this.setFromOrder }
        setToOrder={ this.setToOrder }
        moveTodoCategory={ this.moveTodoCategory }
      />
    );
  }

  render() {
    const todoCategoryListItemElements = this.props.todoCategories.map(
      (todoCategory) => this._createTodoCategoryListItemElement(todoCategory)
    );

    return (
      <section className="todo-category-list">
        <h2>CATEGORIES</h2>
        <ul>{todoCategoryListItemElements}</ul>
        <div className="add-button" onClick={ this.onClickAddButton }>[Add]</div>
      </section>
    );
  }
}

TodoCategoryList.propTypes = propTypes;
