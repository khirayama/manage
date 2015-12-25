import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    const todo = this.props.todo;
    let textComponent;

    return (
      <li key={todo.id} >
        {todo.text}
        <span className="done-button">[DONE]</span>
        <span>[DELETE]</span>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object,
};
