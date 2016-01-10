import React, { Component } from 'react';

import Header from './header';
import TodoList from './todo-list';
import {
  sortTodos,
  moveTodo,
} from '../actions/todo-action-creators';


export default class TodosPage extends Component {
  constructor(props) {
    super(props);

    this._initializeOrder();
  }

  _initializeOrder() {
    this._order = {
      from: null,
      currentCategoryId: '',
      to: null,
      newCategoryId: '',
    };
  }

  _setCurrentOrder(categoryId, from) {
    this._order.from = from;
    this._order.currentCategoryId = categoryId;
  }

  _setNewOrder(categoryId, to) {
    this._order.to = to;
    this._order.newCategoryId = categoryId;
  }

  _moveTodo() {
    const currentCategoryId = this._order.currentCategoryId;
    const from = this._order.from;
    const newCategoryId = this._order.newCategoryId;
    const to = this._order.to;

    if (currentCategoryId === newCategoryId) {
      sortTodos(currentCategoryId, from, to);
    } else {
      moveTodo(currentCategoryId, from, newCategoryId, to);
    }
    this._initializeOrder();
  }

  render() {
    const page = this.props.page;
    const todos = this.props.todos;

    const todoListElements = todos.map((todoCategory) => {
      return (
        <TodoList
          key={todoCategory.categoryId}
          todoCategory={todoCategory}
          setCurrentOrder={this._setCurrentOrder.bind(this)}
          setNewOrder={this._setNewOrder.bind(this)}
          moveTodo={this._moveTodo.bind(this)}
        />
      );
    });

    return (
      <section className="page todos-page">
        <Header page={ page } />
        <section className="page-content">
          { todoListElements }
        </section>
      </section>
    );
  }
}

TodosPage.propTypes = {
  page: React.PropTypes.string.isRequired,
  todos: React.PropTypes.array.isRequired,
};
