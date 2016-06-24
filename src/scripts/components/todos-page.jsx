import React, { Component } from 'react';

import TodoList from './todo-list';
import {
  sortTodos,
  moveTodo,
  createTodoCategory,
  sortTodoCategories,
} from '../actions/todo-action-creators';


const propTypes = {
  todos: React.PropTypes.array.isRequired,
};

export default class TodosPage extends Component {
  constructor(props) {
    super(props);

    this._isItemDragging = false;

    this._initializeOrder();
    this._initializeTodoCategoryOrder();

    this._setIsItemDragging = this._setIsItemDragging.bind(this);

    this._setCurrentOrder = this._setCurrentOrder.bind(this);
    this._setNewOrder = this._setNewOrder.bind(this);
    this._moveTodo = this._moveTodo.bind(this);

    this._setCurrentTodoCategoryOrder = this._setCurrentTodoCategoryOrder.bind(this);
    this._setNewTodoCategoryOrder = this._setNewTodoCategoryOrder.bind(this)
    this._moveTodoCategory = this._moveTodoCategory.bind(this);

    this.onClickAddCategoryButton = this.onClickAddCategoryButton.bind(this);
  }

  onClickAddCategoryButton() {
    createTodoCategory('');
  }

  _setIsItemDragging(isItemDragging) {
    this._isItemDragging = isItemDragging;
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
    this._setIsItemDragging(false);
  }

  _initializeTodoCategoryOrder() {
    this._todoCategoryOrder = {
      from: null,
      to: null,
    };
  }

  _setCurrentTodoCategoryOrder(from) {
    if (this._isItemDragging) {
      return;
    }
    this._todoCategoryOrder.from = from;
  }

  _setNewTodoCategoryOrder(to) {
    if (this._isItemDragging) {
      return;
    }
    this._todoCategoryOrder.to = to;
  }

  _moveTodoCategory() {
    if (this._isItemDragging) {
      return;
    }
    const from = this._todoCategoryOrder.from;
    const to = this._todoCategoryOrder.to;

    if (from !== null && to !== null && from !== to) {
      sortTodoCategories(from, to);
    }
    this._initializeTodoCategoryOrder();
  }

  render() {
    const todos = this.props.todos;
    const todoListElements = todos.map(todoCategory => (
      <section
        className="column todo-list-column"
        key={todoCategory.categoryId}
      >
        <TodoList
          todoCategory={ todoCategory }
          setIsItemDragging={ this._setIsItemDragging }
          setCurrentOrder={ this._setCurrentOrder }
          setNewOrder={ this._setNewOrder }
          moveTodo={ this._moveTodo }
          setCurrentTodoCategoryOrder={ this._setCurrentTodoCategoryOrder }
          setNewTodoCategoryOrder={ this._setNewTodoCategoryOrder }
          moveTodoCategory={ this._moveTodoCategory }
        />
      </section>
    ));

    return (
      <section className="page todos-page">
        <section className="page-content">
          <section className="column-container">
            { todoListElements }
          </section>
          <div
            className="floating-button"
            onClick={ this.onClickAddCategoryButton }
          >
            +
          </div>
        </section>
      </section>
    );
  }
}

TodosPage.propTypes = propTypes;
