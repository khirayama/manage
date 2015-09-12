import React, { Component } from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActionCreators from '../actions/TodoActionCreators';

// TODO: あれ？本当にReact必要なんだっけ？
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    let _todos = TodoStore.where({ categoryId: this.props.category.id }).get();

    this.state = { todos: _todos };
  }

  componentDidMount() {
    TodoStore.addChangeListener(() => {this.onUpdate()});
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(() => {this.onUpdate()});
  }

  onUpdate() {
    let _todos = TodoStore.where({ categoryId: this.props.category.id }).get();

    this.setState({ todos: _todos });
  }

  onClickDone(id, completed) {
    TodoActionCreators.update(id, { completed: !completed });
  }

  onClickDestroy(id) {
    TodoActionCreators.destroy(id);
  }

  render() {
    let todoItemComponents = [];

    for (let i = 0; i < this.state.todos.length; i++) {
      todoItemComponents = this.state.todos.map((todo) => {
        return (
          <li
            key={todo.id}
            className={(todo.completed) ? 'is-completed' : ''}
          >
          <label>{todo.text}</label>
          <div
            onClick={() => {this.onClickDone(todo.id, todo.completed)}}
          >
            [DONE]
          </div>
          <div
            onClick={() => {this.onClickDestroy(todo.id, todo.completed)}}
          >
            [DELETE]
          </div>
          </li>
        );
      });
    }
    return <div><h1>{this.props.category.name}</h1><ul>{todoItemComponents}</ul></div>;
  }
}
