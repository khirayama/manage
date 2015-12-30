import React, { Component } from 'react';

import {
  editTodoCategory,
  updateTodoCategory,
  deleteTodoCategory,
  editNextTodoCategory,
} from '../actions/todo-category-action-creators';
import { keyCodes } from '../constants/constants';


export default class TodoCategoryListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todoCategory.name,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.todoCategory.isEditing && this.props.todoCategory.isEditing) {
      this.selectInputValue();
    }
  }

  onClickDeleteButton() {
    deleteTodoCategory(this.props.todoCategory.id);
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
        editNextTodoCategory(this.props.todoCategory.order);
        break;
      default:
        break;
    }
  }

  onClickLabel() {
    editTodoCategory(this.props.todoCategory.id);
  }

  save() {
    const todoCategory = this.props.todoCategory;
    const text = this.state.value.trim();

    if (text !== '') {
      updateTodoCategory(todoCategory.id, text);
    } else {
      deleteTodoCategory(todoCategory.id);
    }
  }

  selectInputValue() {
    this.refs.input.select();
  }

  render() {
    const todoCategory = this.props.todoCategory;
    let itemContent;

    if (todoCategory.isEditing) {
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
      itemContent = (
        <label
          draggable
          onClick={ this.onClickLabel.bind(this) }
          onDrag={ this.props._onDragStart }
          onDragEnter={ this.props._onDragEnter }
          onDragEnd={ this.props._onDragEnd }
        >
          { todoCategory.name }
        </label>
      );
    }

    return (
      <li key={ todoCategory.id }>
        { itemContent }
        <span onClick={ this.onClickDeleteButton.bind(this) }>[DELETE]</span>
      </li>
    );
  }
}

TodoCategoryListItem.propTypes = {
  todoCategory: React.PropTypes.object.isRequired,
  _onDragStart: React.PropTypes.func.isRequired,
  _onDragEnter: React.PropTypes.func.isRequired,
  _onDragEnd: React.PropTypes.func.isRequired,
};
