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

  onClickDeleteBtn() {
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

    updateTodoCategory(todoCategory.id, this.state.value);
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
          onClick={ this.onClickLabel.bind(this) }
        >
          { todoCategory.name }
        </label>
      );
    }

    return (
      <li key={ todoCategory.id }>
        { itemContent }
        <span onClick={ this.onClickDeleteBtn.bind(this) }>[DELETE]</span>
      </li>
    );
  }
}

TodoCategoryListItem.propTypes = {
  todoCategory: React.PropTypes.object.isRequired,
};
