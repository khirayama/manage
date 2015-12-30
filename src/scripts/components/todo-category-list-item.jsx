import React, { Component } from 'react';

import {
  editTodoCategory,
  updateTodoCategory,
  deleteTodoCategory,
} from '../actions/todo-category-action-creators';
import { keyCodes } from '../constants/constants';


export default class TodoCategoryListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todoCategory.name,
    };
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

    if (keyCode === keyCodes.ENTER) {
      this.save();
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

  render() {
    const todoCategory = this.props.todoCategory;
    let itemContent;

    if (todoCategory.isEditing) {
      itemContent = (
        <input
          autoFocus
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
