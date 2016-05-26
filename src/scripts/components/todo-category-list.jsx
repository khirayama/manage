import React, { Component } from 'react';

import { changePage } from '../actions/app-action-creators';
import {
  createTodoCategory,
  sortTodoCategories,
  editTodoCategory,
  updateTodoCategory,
  deleteTodoCategory,
} from '../actions/todo-category-action-creators';
import {
  keyCodes,
  messages,
  pages,
} from '../constants/constants';
import promiseConfirm from '../utils/promise-confirm';


const todoCategoryListPropTypes = {
  todoCategories: React.PropTypes.array.isRequired,
};

const todoCategoryListItemPropTypes = {
  todoCategory: React.PropTypes.object.isRequired,
  setFromOrder: React.PropTypes.func.isRequired,
  setToOrder: React.PropTypes.func.isRequired,
  moveTodoCategory: React.PropTypes.func.isRequired,
};


export default class TodoCategoryList extends Component {
  constructor(props) {
    super(props);

    this._initializeOrder();

    this.onClickAddButton = this.onClickAddButton.bind(this);
    this.setFromOrder = this.setFromOrder.bind(this);
    this.setToOrder = this.setToOrder.bind(this);
    this.moveTodoCategory = this.moveTodoCategory.bind(this);
  }

  onClickAddButton() {
    createTodoCategory('');
  }

  setFromOrder(from) {
    this._order.from = from;
  }

  setToOrder(to) {
    this._order.to = to;
  }

  moveTodoCategory() {
    if (this._order.from !== null && this._order.to !== null) {
      sortTodoCategories(this._order.from, this._order.to);
      this._initializeOrder();
    }
  }

  _initializeOrder() {
    this._order = {
      from: null,
      to: null,
    };
  }

  _createTodoCategoryListItemElement(todoCategory) {
    return (
      <TodoCategoryListItem
        key={ todoCategory.id }
        todoCategory={ todoCategory }
        setFromOrder={ this.setFromOrder }
        setToOrder={ this.setToOrder }
        moveTodoCategory={ this.moveTodoCategory }
      />
    );
  }

  render() {
    const todoCategoryListItemElements = this.props.todoCategories.map(
      (todoCategory) => this._createTodoCategoryListItemElement(todoCategory)
    );

    return (
      <section className="todo-category-list">
        <h2>CATEGORIES</h2>
        <ul>{todoCategoryListItemElements}</ul>
        <div className="add-button" onClick={ this.onClickAddButton }>[Add]</div>
      </section>
    );
  }
}

class TodoCategoryListItem extends Component {
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
    this.onClickBadge = this.onClickBadge.bind(this);
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

  onClickBadge() {
    changePage(pages.TODOS);
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
          <span
            className="badge"
            onClick={ this.onClickBadge }
          >
            {todoCategory.numberOfTodos}
          </span>
          { todoCategory.name }
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

TodoCategoryList.propTypes = todoCategoryListPropTypes;
TodoCategoryListItem.propTypes = todoCategoryListItemPropTypes;
