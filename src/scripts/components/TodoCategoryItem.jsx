import React, { Component } from 'react';
import TodoCategoryActionCreators from '../actions/TodoCategoryActionCreators';
import { ENTER } from '../constants/constants';

export default class TodoCategoryItem extends Component {
  constructor(props) {
    super(props);

    this.state = { name: this.props.todoCategory.name, editing: false };
    this._state = { showInput: false };
  }

  componentDidMount() {
    if (!this.props.created) this.startEditing();
  }

  componentDidUpdate() {
    if (this._state.showInput) {
      const input = React.findDOMNode(this).querySelector('input');

      if (input) React.findDOMNode(this).querySelector('input').select();
      this._state.showInput = false;
    }
  }

  onClickLabel() {
    this.startEditing();
  }

  onChangeName(event) {
    this.setState({ name: event.target.value });
  }

  onKeyUpName(id, event) {
    const key = event.keyCode;

    if (key === ENTER) this.determineValue(id, this.state.name);
  }

  determineValue(id, name) {
    TodoCategoryActionCreators.update(id, { name: name });
    this.setState({ editing: false });
  }

  startEditing() {
    this.setState({ editing: true });
    this._state.showInput = true;
  }

  render() {
    const todoCategory = this.props.todoCategory;
    let nameComponent;

    if (this.state.editing) {
      nameComponent = <input value={this.state.name} onChange={(event) => { this.onChangeName(event); }} onKeyUp={(event) => { this.onKeyUpName(todoCategory.id, event); }} onBlur={() => { this.determineValue(todoCategory.id, this.state.name); }} placeholder="New List" autoFocus />;
    } else {
      nameComponent = <label onClick={() => { this.onClickLabel(); }} >{ this.state.name }</label>;
    }
    return (
      <li
        key={todoCategory.id}
        draggable
        onDragStart={this.props._onDragStart}
        onDragEnter={this.props._onDragEnter}
        onDragEnd={this.props._onDragEnd}
      >
        {nameComponent}
        <span
          onClick={this.props._onClickDestroy}
        >
          [DELETE]
        </span>
      </li>
    );
  }
}

TodoCategoryItem.propTypes = {
  todoCategory: React.PropTypes.object,
  _onClickDestroy: React.PropTypes.func,
  _onDragStart: React.PropTypes.func,
  _onDragEnter: React.PropTypes.func,
  _onDragEnd: React.PropTypes.func,
};
