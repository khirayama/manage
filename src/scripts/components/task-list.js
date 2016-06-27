import React, { Component } from 'react';

import {
  createTask,
  editTaskCategory,
  updateTaskCategory,
  deleteTaskCategory,
} from '../actions/task-action-creators';
import { messages } from '../constants/constants';
import promiseConfirm from '../utils/promise-confirm';
import TaskListItem from './task-list-item';


const taskListPropTypes = {
  taskCategory: React.PropTypes.object,
  setCurrentOrder: React.PropTypes.func.isRequired,
  setNewOrder: React.PropTypes.func.isRequired,
  moveTask: React.PropTypes.func.isRequired,
  setCurrentTaskCategoryOrder: React.PropTypes.func.isRequired,
  setNewTaskCategoryOrder: React.PropTypes.func.isRequired,
  moveTaskCategory: React.PropTypes.func.isRequired,
  setIsItemDragging: React.PropTypes.func.isRequired,
};

export default class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.taskCategory.categoryName,
    };

    this.onClickTitle = this.onClickTitle.bind(this);
    this.onClickAddButton = this.onClickAddButton.bind(this);
    this.onClickDeleteTaskCategoryButton = this.onClickDeleteTaskCategoryButton.bind(this);
    this.onBlurTaskCategoryInput = this.onBlurTaskCategoryInput.bind(this);
    this.onChangeTaskCategoryInput = this.onChangeTaskCategoryInput.bind(this);
    this.onDragEnterHeader = this.onDragEnterHeader.bind(this);
    this.onDragEndHeader = this.onDragEndHeader.bind(this);
    this.onDragEnterAddButton = this.onDragEnterAddButton.bind(this);
    this.onDragEndAddButton = this.onDragEndAddButton.bind(this);
    this.onDragStartList = this.onDragStartList.bind(this);
    this.onDragEnterList = this.onDragEnterList.bind(this);
    this.onDragEndList = this.onDragEndList.bind(this);
  }

  onClickTitle() {
    editTaskCategory(this.props.taskCategory.categoryId);
  }

  onClickAddButton() {
    createTask('', this.props.taskCategory.categoryId);
  }

  onClickDeleteTaskCategoryButton() {
    if (this.props.taskCategory.tasks.length) {
      promiseConfirm(messages.CONFIRM_DELETE_TASK_CATEGORY).then(() => {
        deleteTaskCategory(this.props.taskCategory.categoryId);
      }).catch(error => error);
    } else {
      deleteTaskCategory(this.props.taskCategory.categoryId);
    }
  }

  onBlurTaskCategoryInput() {
    updateTaskCategory(this.props.taskCategory.categoryId, this.state.value);
  }

  onChangeTaskCategoryInput(event) {
    this.setState({
      value: event.target.value,
    });
  }

  onDragEnterHeader() {
    const taskCategory = this.props.taskCategory;

    this.props.setNewOrder(taskCategory.categoryId, 0);
  }

  onDragEndHeader() {
    this.props.moveTask();
  }

  onDragEnterAddButton() {
    const taskCategory = this.props.taskCategory;

    this.props.setNewOrder(taskCategory.categoryId, taskCategory.tasks.length);
  }

  onDragEndAddButton() {
    this.props.moveTask();
  }

  onDragStartList() {
    this.props.setCurrentTaskCategoryOrder(this.props.taskCategory.order);
  }

  onDragEnterList() {
    this.props.setNewTaskCategoryOrder(this.props.taskCategory.order);
  }

  onDragEndList() {
    this.props.moveTaskCategory();
  }

  _createTaskListItemElement(task) {
    return (
      <TaskListItem
        key={task.id}
        task={task}
        setIsItemDragging={this.props.setIsItemDragging}
        setCurrentOrder={this.props.setCurrentOrder}
        setNewOrder={this.props.setNewOrder}
        moveTask={this.props.moveTask}
      />
    );
  }

  render() {
    const taskCategory = this.props.taskCategory;
    const taskListItemElements = taskCategory.tasks.map(
      (task) => this._createTaskListItemElement(task)
    );

    const titleElement = (this.props.taskCategory.isEditing) ? (
      <div className="list-header-content">
        <input
          autoFocus
          type="text"
          value={this.state.value}
          onBlur={this.onBlurTaskCategoryInput}
          onChange={this.onChangeTaskCategoryInput}
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
          {taskCategory.categoryName}
        </h3>
        <div
          className="list-header-icon"
          onClick={this.onClickDeleteTaskCategoryButton}
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
        <ul>{taskListItemElements}</ul>
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

TaskList.propTypes = taskListPropTypes;
