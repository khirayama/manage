import React, { Component } from 'react';

import {
  deleteTodo,
} from '../actions/todo-action-creators';


export default class TodoItem extends Component {
  onClickDeleteButton() {
    deleteTodo(this.props.todo.id);
  }

  render() {
    const todo = this.props.todo;

    return (
      <li key={todo.id} >
        {todo.text}
        <span className="done-button">[DONE]</span>
        <span onClick={ this.onClickDeleteButton.bind(this) }>[DELETE]</span>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object,
};
