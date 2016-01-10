import React, { Component } from 'react';
import classNames from 'classnames';

import {
  createTodo,
  completeTodo,
  editTodo,
  updateTodo,
  deleteTodo,
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

  onClickDoneButton() {
    completeTodo(this.props.todo.id);
  }

  onClickDeleteButton() {
    deleteTodo(this.props.todo.categoryId, this.props.todo.id);
  }

  onChangeInput(event) {
    this.setState({
      value: event.target.value,
    });
  }

  onKeyDownInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;

    switch (true) {
      case (keyCode === keyCodes.ENTER && !shift && !ctrl):
        this.save();
        break;
      case (keyCode === keyCodes.ENTER && !shift && ctrl):
        if (this.state.value === '') {
          deleteTodo(this.props.todo.categoryId, this.props.todo.id);
        }
        createTodo('', this.props.todo.categoryId);
        break;
      case (keyCode === keyCodes.TAB && !shift && !ctrl):
        event.preventDefault();
        editTodo(this.props.todo.categoryId, this.props.todo.order + 1);
        break;
      case (keyCode === keyCodes.TAB && shift && !ctrl):
        event.preventDefault();
        editTodo(this.props.todo.categoryId, this.props.todo.order - 1);
        break;
      default:
        break;
    }
  }

  onClickLabel() {
    editTodo(this.props.todo.categoryId, this.props.todo.order);
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
    let categoryList;

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
            draggable
            onClick={ this.onClickLabel.bind(this) }
            onDrag={ this.props._onDragStart }
            onDragEnter={ this.props._onDragEnter }
            onDragEnd={ this.props._onDragEnd }
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
      <li className={ classNames('todo-list-item', { 'is-completed': todo.completed }) } key={todo.id} >
        <div>
          <div className="done-button" onClick={ this.onClickDoneButton.bind(this) }><span>D</span></div>
          { itemContent }
          <div className="delete-button" onClick={ this.onClickDeleteButton.bind(this) }><span>[D]</span></div>
        </div>
        { categoryList }
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
