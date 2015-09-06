import React, { Component } from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActionCreators from '../actions/TodoActionCreators';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    let _todos = TodoStore.where({ categoryId: this.props.category.id }).get();

    this.state = { todos: _todos };
  }

  componentDidMount() {
    TodoStore.addChangeListener(() => { this.onUpdate() });
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(() => { this.onUpdate() });
  }

  onUpdate() {
    let _todos = TodoStore.where({ categoryId: this.props.category.id }).get();

    this.setState({ todos: _todos });
  }

  onClickItem(id, completed) {
    TodoActionCreators.update(id, { completed: !completed });
  }

  render() {
    let todoItemComponents = [];

    for (let i = 0; i < this.state.todos.length; i++) {
      todoItemComponents = this.state.todos.map((todo) => {
        return (
          <li
            key={todo.id}
            onClick={() => { this.onClickItem(todo.id, todo.completed) }}
            className={(todo.completed) ? 'is-completed' : ''}
          >
            {todo.text} / {todo.category.name}
          </li>
        );
      });
    }
    return <ul>{todoItemComponents}</ul>;
  }
}
