import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    const todo = this.props.todo;
    const item = parseTextToItem(this.props.todo.text);
    let textComponent;

    if (this.state.editing) {
      textComponent = (
        <input
          autoFocus
          placeholder="New Item"
          value={this.state.text}
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
      <li key={todo.id} >
        {textComponent}
        <span>[DONE]</span>
        <span>[DELETE]</span>
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
