import React, { Component } from 'react';
import TodoActionCreators from '../actions/TodoActionCreators';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  onClickDone(id, completed) {
    TodoActionCreators.update(id, { completed: !completed });
  }

  render() {
    let todo = this.props.todo;

    return (
      <li
        key={todo.id}
        draggable
        className={(todo.completed) ? 'is-completed' : ''}
        onDragStart={this.props._onDragStart}
        onDragEnter={this.props._onDragEnter}
        onDragEnd={this.props._onDragEnd}
      >
        <label
          onClick={() => { this.onClickLabel() }}
        >
          {todo.text}
        </label>
        <span
          onClick={() => { this.onClickDone(todo.id, todo.completed); }}
        >
          [DONE]
        </span>
        <span
          onClick={this.props._onClickDestroy}
        >
          [DELETE]
        </span>
      </li>
    );
  }
}

TodoList.propTypes = {
  todo: React.PropTypes.object,
};
