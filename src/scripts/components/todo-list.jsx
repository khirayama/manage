import React, { Component } from 'react';
import classNames from 'classnames';

import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';
import {
  createTodo,
  completeTodo,
  editTodo,
  editNextTodo,
  editPrevTodo,
  updateTodo,
  deleteTodo,
  editTodoCategory,
  updateTodoCategory,
  deleteTodoCategory,
} from '../actions/todo-action-creators';
import {
  messages,
  keyCodes,
} from '../constants/constants';
import promiseConfirm from '../utils/promise-confirm';


const todoListPropTypes = {
  todoCategory: React.PropTypes.object,
  setCurrentOrder: React.PropTypes.func.isRequired,
  setNewOrder: React.PropTypes.func.isRequired,
  moveTodo: React.PropTypes.func.isRequired,
};

const todoListItemPropTypes = {
  todo: React.PropTypes.object.isRequired,
  setCurrentOrder: React.PropTypes.func,
  setNewOrder: React.PropTypes.func,
  moveTodo: React.PropTypes.func,
};

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todoCategory.categoryName,
    };

    this.onClickTitle = this.onClickTitle.bind(this);
    this.onClickAddButton = this.onClickAddButton.bind(this);
    this.onClickDeleteTodoCategoryButton = this.onClickDeleteTodoCategoryButton.bind(this);
    this.onBlurTodoCategoryInput = this.onBlurTodoCategoryInput.bind(this);
    this.onChangeTodoCategoryInput = this.onChangeTodoCategoryInput.bind(this);
    this.onDragEnterHeader = this.onDragEnterHeader.bind(this);
    this.onDragEndHeader = this.onDragEndHeader.bind(this);
    this.onDragEnterAddButton = this.onDragEnterAddButton.bind(this);
    this.onDragEndAddButton = this.onDragEndAddButton.bind(this);
    this.onDragStartList = this.onDragStartList.bind(this);
    this.onDragEnterList = this.onDragEnterList.bind(this);
    this.onDragEndList = this.onDragEndList.bind(this);
  }

  onClickTitle() {
    editTodoCategory(this.props.todoCategory.categoryId);
  }

  onClickAddButton() {
    createTodo('', this.props.todoCategory.categoryId);
  }

  onClickDeleteTodoCategoryButton() {
    if (this.props.todoCategory.todos.length) {
      promiseConfirm(messages.CONFIRM_DELETE_TODO_CATEGORY).then(() => {
        deleteTodoCategory(this.props.todoCategory.categoryId);
      }).catch(error => error);
    } else {
      deleteTodoCategory(this.props.todoCategory.categoryId);
    }
  }

  onBlurTodoCategoryInput() {
    updateTodoCategory(this.props.todoCategory.categoryId, this.state.value);
  }

  onChangeTodoCategoryInput(event) {
    this.setState({
      value: event.target.value,
    });
  }

  onDragEnterHeader() {
    const todoCategory = this.props.todoCategory;

    this.props.setNewOrder(todoCategory.categoryId, 0);
  }

  onDragEndHeader() {
    this.props.moveTodo();
  }

  onDragEnterAddButton() {
    const todoCategory = this.props.todoCategory;

    this.props.setNewOrder(todoCategory.categoryId, todoCategory.todos.length);
  }

  onDragEndAddButton() {
    this.props.moveTodo();
  }

  onDragStartList() {
    this.props.setCurrentTodoCategoryOrder(this.props.todoCategory.order);
  }

  onDragEnterList() {
    this.props.setNewTodoCategoryOrder(this.props.todoCategory.order);
  }

  onDragEndList() {
    this.props.moveTodoCategory();
  }

  _createTodoListItemElement(todo) {
    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
        setIsItemDragging={ this.props.setIsItemDragging }
        setCurrentOrder={ this.props.setCurrentOrder }
        setNewOrder={ this.props.setNewOrder }
        moveTodo={ this.props.moveTodo }
      />
    );
  }

  render() {
    const todoCategory = this.props.todoCategory;
    const todoListItemElements = todoCategory.todos.map(
      (todo) => this._createTodoListItemElement(todo)
    );

    const titleElement = (this.props.todoCategory.isEditing) ? (
      <div className="list-header-content">
        <input
          autoFocus
          type="text"
          value={ this.state.value }
          onBlur={ this.onBlurTodoCategoryInput }
          onChange={ this.onChangeTodoCategoryInput }
        />
      </div>
    ) : (
      <div className="list-header-content">
        <h3
          className="list-header-text"
          onDragEnter={ this.onDragEnterHeader }
          onDragEnd={ this.onDragEndHeader }
          onClick={ this.onClickTitle }
        >
          {todoCategory.categoryName}
        </h3>
        <div className="list-header-icon" onClick={ this.onClickDeleteTodoCategoryButton }><span>D</span></div>
      </div>
    );
    return (
      <section
        draggable
        className="list"
        onDragStart={ this.onDragStartList }
        onDragEnter={ this.onDragEnterList }
        onDragEnd={ this.onDragEndList }
      >
        <header className="list-header">{ titleElement }</header>
        <ul>{ todoListItemElements }</ul>
        <footer>
          <div
            onClick={ this.onClickAddButton }
            onDragEnter={ this.onDragEnterAddButton }
            onDragEnd={ this.onDragEndAddButton }
          >
            [Add]
          </div>
        </footer>
      </section>
    );
  }
}

class TodoListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todo.text,
    };

    this.onClickLabel = this.onClickLabel.bind(this);
    this.onClickDoneButton = this.onClickDoneButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onKeyDownInput = this.onKeyDownInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.todo.isEditing && this.props.todo.isEditing) {
      this.selectInputValue();
    }
  }

  onClickLabel() {
    if (!this.props.todo.completed) {
      editTodo(this.props.todo.id);
    }
  }

  onClickDoneButton() {
    completeTodo(this.props.todo.id);
  }

  onClickDeleteButton() {
    deleteTodo(this.props.todo.categoryId, this.props.todo.id);
  }

  onDragStart() {
    const todo = this.props.todo;

    this.props.setIsItemDragging(true);
    this.props.setCurrentOrder(todo.categoryId, todo.order);
  }

  onDragEnter() {
    const todo = this.props.todo;

    this.props.setNewOrder(todo.categoryId, todo.order);
  }

  onDragEnd() {
    this.props.setIsItemDragging(false);
    this.props.moveTodo();
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
      case (keyCode === keyCodes.ESC && !shift && !ctrl):
        this.save();
        break;
      case (keyCode === keyCodes.TAB && !shift && !ctrl):
        event.preventDefault();
        editNextTodo(this.props.todo.categoryId, this.props.todo.order);
        break;
      case (keyCode === keyCodes.TAB && shift && !ctrl):
        event.preventDefault();
        editPrevTodo(this.props.todo.categoryId, this.props.todo.order);
        break;
      default:
        break;
    }
  }

  onBlurInput() {
    this.save();
  }

  save() {
    const todo = this.props.todo;
    const text = this.state.value.trim();

    if (text !== '') {
      updateTodo(todo.id, text);
    } else {
      deleteTodo(todo.categoryId, todo.id);
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
        <div className="list-item-text">
          <input
            autoFocus
            ref="input"
            placeholder={ 'Add a todo' }
            value={ this.state.value }
            onChange={ this.onChangeInput }
            onKeyDown={ this.onKeyDownInput }
            onBlur={ this.onBlurInput }
          />
        </div>
      );
    } else {
      const itemContentProps = {
        className: 'list-item-text',
        draggable: true,
        onClick: this.onClickLabel,
        onDragStart: this.onDragStart,
        onDragEnter: this.onDragEnter,
        onDragEnd: this.onDragEnd,
      };

      if (todo.schedule) {
        const schedule = todo.schedule;
        itemContent = (
          <div { ...itemContentProps } >
            { todo.scheduleText }
            <div className="list-item-note">
              {schedule.year}/{schedule.month}/{schedule.date}({schedule.shortDayName}.)
            </div>
          </div>
        );
      } else {
        itemContent = <div { ...itemContentProps } >{ todo.text }</div>;
      }
    }

    return (
      <li
        key={ todo.id }
        className={ classNames('list-item', { 'list-item__disabled': todo.completed }) }
      >
        <div className="list-item-content">
          <div className="list-item-icon" onClick={ this.onClickDoneButton }><span>D</span></div>
          { itemContent }
          <div className="list-item-icon" onClick={ this.onClickDeleteButton }><span>[D]</span></div>
        </div>
      </li>
    );
  }
}

TodoList.propTypes = todoListPropTypes;
TodoListItem.propTypes = todoListItemPropTypes;
