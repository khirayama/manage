import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    const todo = this.props.todo;
    let textComponent;

    return (
      <li key={todo.id} >
        {todo.text}
        <span>[DONE]</span>
        <span>[DELETE]</span>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object,
};
