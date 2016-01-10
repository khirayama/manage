import React, { Component } from 'react';
import TodoListItem from './todo-list-item';

import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';
import { createTodo } from '../actions/todo-action-creators';


export default class TodoList extends Component {
  onClickTitle(page) {
    changePage(page);
  }

  onClickAddButton() {
    createTodo('', this.props.todoCategory.categoryId);
  }

  onDragStart(categoryId, from) {
    this.props.setCurrentOrder(categoryId, from);
  }

  onDragEnter(categoryId, to) {
    this.props.setNewOrder(categoryId, to);
  }

  onDragEnd() {
    this.props.moveTodo();
  }

  _createTodoListItemElement(todo) {
    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
        otherCategories={this.props.todoCategory.otherCategories}
        _onDragStart={ this.onDragStart.bind(this, todo.categoryId, todo.order) }
        _onDragEnter={ this.onDragEnter.bind(this, todo.categoryId, todo.order) }
        _onDragEnd={ this.onDragEnd.bind(this) }
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
          onDragEnter={ this.onDragEnter.bind(this, todoCategory.categoryId, 0) }
          onDragEnd={ this.onDragEnd.bind(this) }
        >
          {todoCategory.categoryName}
          <span
            className="edit-button"
            onClick={ this.onClickTitle.bind(this, pages.TODO_CATEGORIES) }
          >
          [E]
        </span>
        </h2>
        <ul>{ todoListItemElements }</ul>
        <div
          className="add-button"
          onClick={ this.onClickAddButton.bind(this) }
          onDragEnter={ this.onDragEnter.bind(this, todoCategory.categoryId, todoCategory.todos.length) }
          onDragEnd={ this.onDragEnd.bind(this) }
        >
          [Add]
        </div>
      </section>
    );
  }
}

TodoList.propTypes = {
  todoCategory: React.PropTypes.object,
  setCurrentOrder: React.PropTypes.func.isRequired,
  setNewOrder: React.PropTypes.func.isRequired,
  moveTodo: React.PropTypes.func.isRequired,
};
