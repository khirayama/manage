import React, { Component } from 'react';
import TodoListItem from './todo-list-item';

import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';
import {
  createTodo,
  sortTodos,
} from '../actions/todo-action-creators';


export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this._initializeOrder();
  }

  onClickTitle(page) {
    changePage(page);
  }

  onClickAddButton() {
    createTodo('', this.props.todoCategory.categoryId);
  }

  onDragStart(from) {
    this._order.from = from;
  }

  onDragEnter(to) {
    this._order.to = to;
  }

  onDragEnd(todoCategoryId) {
    if (this._order.from !== null && this._order.to !== null) {
      sortTodos(todoCategoryId, this._order.from, this._order.to);
      this._initializeOrder();
    }
  }

  _initializeOrder() {
    this._order = {
      from: null,
      to: null,
    };
  }

  _createTodoListItemElement(todo) {
    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
        otherCategories={this.props.todoCategory.otherCategories}
        _onDragStart={ this.onDragStart.bind(this, todo.order) }
        _onDragEnter={ this.onDragEnter.bind(this, todo.order) }
        _onDragEnd={ this.onDragEnd.bind(this, todo.categoryId) }
      />
    );
  }

  render() {
    const todoListItemElements = this.props.todoCategory.todos.map((todo) => {
      return this._createTodoListItemElement(todo);
    });

    return (
      <section className="todo-list">
        <h2 onClick={ this.onClickTitle.bind(this, pages.TODO_CATEGORIES) }>{this.props.todoCategory.categoryName}</h2>
        <ul>{ todoListItemElements }</ul>
        <div className="add-button" onClick={ this.onClickAddButton.bind(this) }>[Add]</div>
      </section>
    );
  }
}

TodoList.propTypes = {
  todoCategory: React.PropTypes.object,
};
