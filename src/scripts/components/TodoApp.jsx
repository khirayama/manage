import React from 'react';
import {Component} from 'react';
import {TODO_CATEGORY} from '../constants/constants';
import TodoStore from '../stores/TodoStore';
import TodoActionCreators from '../actions/TodoActionCreators';

export default class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todos: TodoStore.get()
    };
    this._onUpdate = this.__onUpdate.bind(this);
    this._onClick = this.__onClick.bind(this);
    this._onClickItem = this.__onClickItem.bind(this);
  }
  componentDidMount() {
    TodoStore.addChangeListener(this._onUpdate);
  }
  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onUpdate);
  }
  render() {
    let todos = this.state.todos.map((todo) => {
      return (
        <li
          key={todo.id}
          onClick={() => {this._onClickItem(todo.id, todo.completed)}}
          className={todo.completed}
        >
          {todo.text}
        </li>
      );
    });
    return (
      <section>
        <h1>Manage</h1>
        <div onClick={this._onClick}>Add todo</div>
        <ul>{todos}</ul>
      </section>
    );
  }
  __onUpdate() {
    this.setState({
      todos: TodoStore.get()
    });
  }
  __onClick() {
    TodoActionCreators.create({text: 'Hello World', category: TODO_CATEGORY.TODAY});
  }
  __onClickItem(id, completed) {
    TodoActionCreators.update(id, {completed: !completed});
  }
}
