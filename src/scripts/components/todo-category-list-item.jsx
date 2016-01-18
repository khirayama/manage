import React, { Component } from 'react';

import {
  createTodoCategory,
  editTodoCategory,
  updateTodoCategory,
  deleteTodoCategory,
} from '../actions/todo-category-action-creators';
import {
  keyCodes,
  messages,
} from '../constants/constants';
import promiseConfirm from '../utils/promise-confirm';


const propTypes = {
  todoCategory: React.PropTypes.object.isRequired,
  setFromOrder: React.PropTypes.func.isRequired,
  setToOrder: React.PropTypes.func.isRequired,
  moveTodoCategory: React.PropTypes.func.isRequired,
};

export default class TodoCategoryListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todoCategory.name,
    };

    this.onClickLabel = this.onClickLabel.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onKeyDownInput = this.onKeyDownInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.todoCategory.isEditing && this.props.todoCategory.isEditing) {
      this.selectInputValue();
    }
  }

  onClickLabel() {
    editTodoCategory(this.props.todoCategory.id);
  }

  onDragStart() {
    this.props.setFromOrder(this.props.todoCategory.order);
  }

  onDragEnter() {
    this.props.setToOrder(this.props.todoCategory.order);
  }

  onDragEnd() {
    this.props.moveTodoCategory();
  }

  onClickDeleteButton() {
    const todoCategory = this.props.todoCategory;

    if (todoCategory.numberOfTodos !== 0) {
      promiseConfirm(messages.CONFIRM_DELETE_TODO_CATEGORY).then(() => {
        deleteTodoCategory(todoCategory.id);
      }).catch(error => error);
    } else {
      deleteTodoCategory(todoCategory.id);
    }
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
          deleteTodoCategory(this.props.todoCategory.id);
        }
        createTodoCategory('');
        break;
      case (keyCode === keyCodes.ESC && !shift && !ctrl):
        this.save();
        break;
      case (keyCode === keyCodes.TAB && !shift && !ctrl):
        event.preventDefault();
        editTodoCategory(this.props.todoCategory.order + 1);
        break;
      case (keyCode === keyCodes.TAB && shift && !ctrl):
        event.preventDefault();
        editTodoCategory(this.props.todoCategory.order - 1);
        break;
      default:
        break;
    }
  }

  onBlurInput() {
    this.save();
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
          placeholder="Add a category"
          value={ this.state.value }
          onChange={ this.onChangeInput }
          onKeyDown={ this.onKeyDownInput }
          onBlur={ this.onBlurInput }
        />
      );
    } else {
      itemContent = (
        <label
          draggable
          onClick={ this.onClickLabel }
          onDragStart={ this.onDragStart }
          onDragEnter={ this.onDragEnter }
          onDragEnd={ this.onDragEnd }
        >
        {todoCategory.numberOfTodos} / { todoCategory.name }
        </label>
      );
    }

    return (
      <li className="todo-category-list-item" key={ todoCategory.id }>
        { itemContent }
        <div className="delete-button" onClick={ this.onClickDeleteButton }><span>[D]</span></div>
      </li>
    );
  }
}

TodoCategoryListItem.propTypes = propTypes;
