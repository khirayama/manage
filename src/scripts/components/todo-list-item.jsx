import React, { Component } from 'react';

import {
  editTodo,
  updateTodo,
  deleteTodo,
  editNextTodo,
} from '../actions/todo-action-creators';
import { keyCodes } from '../constants/constants';


export default class TodoListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todo.text,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.todo.isEditing && this.props.todo.isEditing) {
      this.selectInputValue();
    }
  }

  onClickDeleteButton() {
    deleteTodo(this.props.todo.id);
  }

  onChangeInput(event) {
    this.setState({
      value: event.target.value,
    });
  }

  onKeyDownInput(event) {
    const keyCode = event.keyCode;

    switch (true) {
      case (keyCode === keyCodes.ENTER):
        this.save();
        break;
      case (keyCode === keyCodes.TAB):
        event.preventDefault();
        editNextTodo(this.props.todo.categoryId, this.props.todo.order);
        break;
      default:
        break;
    }
  }

  onClickLabel() {
    editTodo(this.props.todo.id);
  }

  save() {
    const todo = this.props.todo;
    const text = this.state.value.trim();

    if (text !== '') {
      updateTodo(todo.id, text);
    } else {
      deleteTodo(todo.id);
    }
  }

  selectInputValue() {
    this.refs.input.select();
  }

  render() {
    const todo = this.props.todo;
    let itemContent;

    if (todo.isEditing) {
      itemContent = (
        <input
          autoFocus
          ref="input"
          value={ this.state.value }
          onChange={ this.onChangeInput.bind(this) }
          onKeyDown={ this.onKeyDownInput.bind(this) }
          onBlur={ this.save.bind(this) }
        />
      );
    } else {
      if (todo.schedule) {
        const schedule = todo.schedule;

        itemContent = (
          <label
            onClick={ this.onClickLabel.bind(this) }
          >
            <span>{schedule.year}/{schedule.month}/{schedule.date}({schedule.shortDayName}.)</span>
            { todo.scheduleText }
          </label>
        );
      } else {
        itemContent = (
          <label
            draggable
            onClick={ this.onClickLabel.bind(this) }
            onDrag={ this.props._onDragStart }
            onDragEnter={ this.props._onDragEnter }
            onDragEnd={ this.props._onDragEnd }
          >
            { todo.text }
          </label>
        );
      }
    }

    return (
      <li key={todo.id} >
        { itemContent }
        <span className="done-button">[DONE]</span>
        <span onClick={ this.onClickDeleteButton.bind(this) }>[DELETE]</span>
      </li>
    );
  }
}

TodoListItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  _onDragStart: React.PropTypes.func,
  _onDragEnter: React.PropTypes.func,
  _onDragEnd: React.PropTypes.func,
};
