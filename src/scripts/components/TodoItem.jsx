import React, { Component } from 'react';
import TodoActions from '../actions/TodoActions';
import { TextToScheduleParser } from '../utils/Utils';
import { ENTER } from '../constants/constants';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = { text: this.props.todo.text, editing: false };
    this._state = { isInputShowing: false };
  }

  componentDidMount() {
    if (!this.props.created) this.startEditing();
  }

  componentDidUpdate() {
    if (this._state.isInputShowing) {
      const input = React.findDOMNode(this).querySelector('input');

      if (input) React.findDOMNode(this).querySelector('input').select();
      this._state.isInputShowing = false;
    }
  }

  onClickLabel() {
    this.startEditing();
  }

  onClickDone(id, completed) {
    TodoActions.update(id, { completed: !completed });
  }

  onChangeText(event) {
    this.setState({ text: event.target.value });
  }

  onKeyUpText(id, event) {
    const key = event.keyCode;

    if (key === ENTER) this.determineValue(id, this.state.text);
  }

  determineValue(id, text) {
    TodoActions.update(id, { text: text });
    this.setState({ editing: false });
  }

  startEditing() {
    this.setState({ editing: true });
    this._state.isInputShowing = true;
  }

  render() {
    const todo = this.props.todo;
    const textToScheduleParser = new TextToScheduleParser();
    const item = textToScheduleParser.parseTextToItem(this.props.todo.text);
    let textComponent;

    if (this.state.editing) {
      textComponent = (
        <input
          autoFocus
          placeholder="New Item"
          value={this.state.text}
          onChange={(event) => { this.onChangeText(event); }}
          onKeyUp={(event) => { this.onKeyUpText(todo.id, event); }}
          onBlur={() => { this.determineValue(todo.id, this.state.text); }}
        />
      );
    } else {
      const scheduleLabelComponent = (item.schedule) ? <time>{item.schedule.year}/{item.schedule.month}/{item.schedule.date} {item.schedule.shortDayName}.</time> : false;
      textComponent = (
        <label onClick={() => { this.onClickLabel(); }} >
          {scheduleLabelComponent}
          <span>{item.text}</span>
        </label>
      );
    }
    return (
      <li
        key={todo.id}
        draggable
        className={(todo.completed) ? 'is-completed' : ''}
        onDragStart={this.props._onDragStart}
        onDragEnter={this.props._onDragEnter}
        onDragEnd={this.props._onDragEnd}
      >
        {textComponent}
        <span
          onClick={() => { this.onClickDone(todo.id, todo.completed); }}
        >
          [DONE]
        </span>
        <span
          onClick={this.props._onClickDestroy}
        >
          [DELETE]
        </span>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object,
  _onClickDestroy: React.PropTypes.func,
  _onDragStart: React.PropTypes.func,
  _onDragEnter: React.PropTypes.func,
  _onDragEnd: React.PropTypes.func,
  created: React.PropTypes.bool,
};
