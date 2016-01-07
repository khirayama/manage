import React, { Component } from 'react';

import {
  createTodoCategory,
  sortTodoCategories,
} from '../actions/todo-category-action-creators';
import TodoCategoryListItem from './todo-category-list-item';


export default class TodoCategoryList extends Component {
  constructor(props) {
    super(props);

    this._initializeOrder();
  }

  onClickAddButton() {
    createTodoCategory('');
  }

  onDragStart(from) {
    this._order.from = from;
  }

  onDragEnter(to) {
    this._order.to = to;
  }

  onDragEnd() {
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
        _onDragStart={ this.onDragStart.bind(this, todoCategory.order) }
        _onDragEnter={ this.onDragEnter.bind(this, todoCategory.order) }
        _onDragEnd={ this.onDragEnd.bind(this) }
      />
    );
  }

  render() {
    const todoCategoryListItemElements = this.props.todoCategories.map((todoCategory) => {
      return this._createTodoCategoryListItemElement(todoCategory);
    });

    return (
      <section className="todo-category-list">
        <h2>CATEGORIES</h2>
        <ul>{todoCategoryListItemElements}</ul>
        <div className="add-button" onClick={ this.onClickAddButton.bind(this) }>[Add]</div>
      </section>
    );
  }
}

TodoCategoryList.propTypes = {
  todoCategories: React.PropTypes.array.isRequired,
};
