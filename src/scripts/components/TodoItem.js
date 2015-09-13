import React, { Component } from 'react';
import TodoActionCreators from '../actions/TodoActionCreators';

// TODO: support to update category
// TODO: snippets ex) this fri ->
const ENTER = 13;

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = { text: this.props.todo.text, editing: false };
  }

  onClickLabel() {
    this.setState({ editing: true });
  }

  onClickDone(id, completed) {
    TodoActionCreators.update(id, { completed: !completed });
  }

  onChangeText(event) {
    this.setState({ text: event.target.value });
  }

  onKeyUpText(id, event) {
    const key = event.keyCode;

    if (key === ENTER) this.determineValue(id, this.state.text);
  }

  determineValue(id, text) {
    TodoActionCreators.update(id, { text: text });
    this.setState({ editing: false });
  }

  render() {
    const todo = this.props.todo;
    let textComponent;

    if (this.state.editing) {
      textComponent = <input value={this.state.text} onChange={() => { this.onChangeText(event); }} onKeyUp={(event) => { this.onKeyUpText(todo.id, event); }} onBlur={() => { this.determineValue(todo.id, this.state.text); }} autoFocus />;
    } else {
      textComponent = <label onClick={() => { this.onClickLabel(); }} >{ this.state.text }</label>;
    }
    return (
      <li
        key={todo.id}
        draggable
        className={(todo.completed) ? 'is-completed' : ''}
        onDragStart={this.props._onDragStart}
        onDragEnter={this.props._onDragEnter}
        onDragEnd={this.props._onDragEnd}
      >
        {textComponent}
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
  _onClickDestroy: React.PropTypes.function,
  _onDragStart: React.PropTypes.function,
  _onDragEnter: React.PropTypes.function,
  _onDragEnd: React.PropTypes.function,
};
