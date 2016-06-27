import React, { Component } from 'react';

import {
  createTodo,
  editTodoCategory,
  updateTodoCategory,
  deleteTodoCategory,
} from '../actions/todo-action-creators';
import { messages } from '../constants/constants';
import promiseConfirm from '../utils/promise-confirm';
import TodoListItem from './todo-list-item';


const todoListPropTypes = {
  todoCategory: React.PropTypes.object,
  setCurrentOrder: React.PropTypes.func.isRequired,
  setNewOrder: React.PropTypes.func.isRequired,
  moveTodo: React.PropTypes.func.isRequired,
  setCurrentTodoCategoryOrder: React.PropTypes.func.isRequired,
  setNewTodoCategoryOrder: React.PropTypes.func.isRequired,
  moveTodoCategory: React.PropTypes.func.isRequired,
  setIsItemDragging: React.PropTypes.func.isRequired,
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
        setIsItemDragging={this.props.setIsItemDragging}
        setCurrentOrder={this.props.setCurrentOrder}
        setNewOrder={this.props.setNewOrder}
        moveTodo={this.props.moveTodo}
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
          value={this.state.value}
          onBlur={this.onBlurTodoCategoryInput}
          onChange={this.onChangeTodoCategoryInput}
        />
      </div>
    ) : (
      <div className="list-header-content">
        <h3
          className="list-header-text"
          onDragEnter={this.onDragEnterHeader}
          onDragEnd={this.onDragEndHeader}
          onClick={this.onClickTitle}
        >
          {todoCategory.categoryName}
        </h3>
        <div
          className="list-header-icon"
          onClick={this.onClickDeleteTodoCategoryButton}
        >
          <span>D</span>
        </div>
      </div>
    );
    return (
      <section
        draggable
        className="list"
        onDragStart={this.onDragStartList}
        onDragEnter={this.onDragEnterList}
        onDragEnd={this.onDragEndList}
      >
        <header className="list-header">{titleElement}</header>
        <ul>{todoListItemElements}</ul>
        <footer>
          <div
            onClick={this.onClickAddButton}
            onDragEnter={this.onDragEnterAddButton}
            onDragEnd={this.onDragEndAddButton}
          >
            [Add]
          </div>
        </footer>
      </section>
    );
  }
}

TodoList.propTypes = todoListPropTypes;
