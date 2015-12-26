import React, { Component } from 'react';
import TodoListItem from './todo-list-item';

import {
  createTodo,
} from '../actions/todo-action-creators';


export default class TodoList extends Component {
  onClickAddButton() {
    createTodo('', this.props.todoCategory.categoryId);
  }

  _createTodoListItem(todo) {
    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
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
