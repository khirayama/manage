import React, { Component } from 'react';
import TodoListItem from './todo-list-item';

import {
  createTodo,
  sortTodos,
} from '../actions/todo-action-creators';


export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this._initializeOrder();
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

  _createTodoListItem(todo) {
    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
        _onDragStart={ this.onDragStart.bind(this, todo.order) }
        _onDragEnter={ this.onDragEnter.bind(this, todo.order) }
        _onDragEnd={ this.onDragEnd.bind(this, todo.categoryId) }
      />
    );
  }

  render() {
    const todoListItemElements = this.props.todoCategory.todos.map((todo) => {
      return this._createTodoListItem(todo);
    });

    return (
      <section>
        <h2>{this.props.todoCategory.categoryName}</h2>
        <div onClick={ this.onClickAddButton.bind(this) }>[Add]</div>
        <ul>{ todoListItemElements }</ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todoCategory: React.PropTypes.object,
};
