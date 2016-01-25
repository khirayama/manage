import React, { Component } from 'react';
import TodoListItem from './todo-list-item';

import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';
import { createTodo } from '../actions/todo-action-creators';


const propTypes = {
  todoCategory: React.PropTypes.object,
  setCurrentOrder: React.PropTypes.func.isRequired,
  setNewOrder: React.PropTypes.func.isRequired,
  moveTodo: React.PropTypes.func.isRequired,
};

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.onClickTitle = this.onClickTitle.bind(this);
    this.onClickAddButton = this.onClickAddButton.bind(this);
    this.onDragEnterHeader = this.onDragEnterHeader.bind(this);
    this.onDragEndHeader = this.onDragEndHeader.bind(this);
    this.onDragEnterAddButton = this.onDragEnterAddButton.bind(this);
    this.onDragEndAddButton = this.onDragEndAddButton.bind(this);
  }

  onClickTitle() {
    changePage(pages.TODO_CATEGORIES);
  }

  onClickAddButton() {
    createTodo('', this.props.todoCategory.categoryId);
  }

  onDragEnterHeader() {
    const todoCategory = this.props.todoCategory;

    this.props.setNewOrder(todoCategory.categoryId, 0);
  }

  onDragEndHeader() {
    this.props.moveTodo();
  }

  onDragEnterAddButton() {
    const todoCategory = this.props.todoCategory;

    this.props.setNewOrder(todoCategory.categoryId, todoCategory.todos.length);
  }

  onDragEndAddButton() {
    this.props.moveTodo();
  }

  _createTodoListItemElement(todo) {
    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
        setCurrentOrder={ this.props.setCurrentOrder }
        setNewOrder={ this.props.setNewOrder }
        moveTodo={ this.props.moveTodo }
      />
    );
  }

  render() {
    const todoCategory = this.props.todoCategory;
    const todoListItemElements = todoCategory.todos.map((todo) => {
      return this._createTodoListItemElement(todo);
    });

    return (
      <section className="todo-list">
        <h2
          onDragEnter={ this.onDragEnterHeader }
          onDragEnd={ this.onDragEndHeader }
          onClick={ this.onClickTitle }
        >
          {todoCategory.categoryName}
        </h2>
        <ul>{ todoListItemElements }</ul>
        <div
          className="add-button"
          onClick={ this.onClickAddButton }
          onDragEnter={ this.onDragEnterAddButton }
          onDragEnd={ this.onDragEndAddButton }
        >
          [Add]
        </div>
      </section>
    );
  }
}

TodoList.propTypes = propTypes;
