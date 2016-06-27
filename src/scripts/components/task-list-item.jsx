import React, { Component } from 'react';
import classNames from 'classnames';

import {
  createTask,
  completeTask,
  editTask,
  editNextTask,
  editPrevTask,
  updateTask,
  deleteTask,
} from '../actions/task-action-creators';
import { keyCodes } from '../constants/constants';


const taskListItemPropTypes = {
  task: React.PropTypes.object.isRequired,
  setCurrentOrder: React.PropTypes.func,
  setNewOrder: React.PropTypes.func,
  moveTask: React.PropTypes.func,
  setIsItemDragging: React.PropTypes.func,
};

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.task.text,
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
    if (!prevProps.task.isEditing && this.props.task.isEditing) {
      this.selectInputValue();
    }
  }

  onClickLabel() {
    if (!this.props.task.completed) {
      editTask(this.props.task.id);
    }
  }

  onClickDoneButton() {
    completeTask(this.props.task.id);
  }

  onClickDeleteButton() {
    deleteTask(this.props.task.categoryId, this.props.task.id);
  }

  onDragStart() {
    const task = this.props.task;

    this.props.setIsItemDragging(true);
    this.props.setCurrentOrder(task.categoryId, task.order);
  }

  onDragEnter() {
    const task = this.props.task;

    this.props.setNewOrder(task.categoryId, task.order);
  }

  onDragEnd() {
    this.props.setIsItemDragging(false);
    this.props.moveTask();
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
          deleteTask(this.props.task.categoryId, this.props.task.id);
        }
        createTask('', this.props.task.categoryId);
        break;
      case (keyCode === keyCodes.ESC && !shift && !ctrl):
        this.save();
        break;
      case (keyCode === keyCodes.TAB && !shift && !ctrl):
        event.preventDefault();
        editNextTask(this.props.task.categoryId, this.props.task.order);
        break;
      case (keyCode === keyCodes.TAB && shift && !ctrl):
        event.preventDefault();
        editPrevTask(this.props.task.categoryId, this.props.task.order);
        break;
      default:
        break;
    }
  }

  onBlurInput() {
    this.save();
  }

  save() {
    const task = this.props.task;
    const text = this.state.value.trim();

    if (text !== '') {
      updateTask(task.id, text);
    } else {
      deleteTask(task.categoryId, task.id);
    }
  }

  selectInputValue() {
    this.refs.input.select();
  }

  render() {
    const task = this.props.task;
    let itemContent;

    if (task.isEditing) {
      itemContent = (
        <div className="list-item-text">
          <input
            autoFocus
            ref="input"
            placeholder={'Add a task'}
            value={this.state.value}
            onChange={this.onChangeInput}
            onKeyDown={this.onKeyDownInput}
            onBlur={this.onBlurInput}
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

      if (task.schedule) {
        const schedule = task.schedule;
        itemContent = (
          <div {...itemContentProps} >
            {task.scheduleText}
            <div className="list-item-note">
              {schedule.year}/{schedule.month}/{schedule.date}({schedule.shortDayName}.)
            </div>
          </div>
        );
      } else {
        itemContent = <div {...itemContentProps} >{task.text}</div>;
      }
    }

    return (
      <li
        key={task.id}
        className={classNames('list-item', { 'list-item__disabled': task.completed })}
      >
        <div className="list-item-content">
          <div className="list-item-icon" onClick={this.onClickDoneButton}><span>D</span></div>
          {itemContent}
          <div className="list-item-icon" onClick={this.onClickDeleteButton}><span>[D]</span></div>
        </div>
      </li>
    );
  }
}

TaskListItem.propTypes = taskListItemPropTypes;
