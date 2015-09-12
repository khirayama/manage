import React, { Component } from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActionCreators from '../actions/TodoActionCreators';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    let _todos = TodoStore.where({ categoryId: this.props.category.id }).order('order').get();

    this.state = { todos: _todos };
    this._state = { from: 0, to: 0 };
  }

  componentDidMount() {
    TodoStore.addChangeListener(() => {this.onUpdate()});
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(() => {this.onUpdate()});
  }

  onUpdate() {
    let _todos = TodoStore.where({ categoryId: this.props.category.id }).order('order').get();

    console.log(_todos);
    this.setState({ todos: _todos });
  }

  onDragStart(order) {
    this._state.from = order;
  }

  onDragEnter(order) {
    this._state.to = order;
  }

  onDragEnd() {
    let from = this._state.from;
    let to = this._state.to;

    console.log(`from ${from} to ${to}`);
  }

  onClickAdd() {
    TodoActionCreators.create({ text: 'Hello World', categoryId: this.props.category.id, order: this.state.todos.length });
  }

  onClickDone(id, completed) {
    TodoActionCreators.update(id, { completed: !completed });
  }

  onClickDestroy(id, order) {
    for (let i = 0; i < this.state.todos.length; i++) {
      let todo = this.state.todos[i];

      if (i === order) {
        TodoActionCreators.destroy(id);
      } else if (i > order) {
        TodoActionCreators.update(todo.id, {order: todo.order - 1});
      }
    }
  }

  render() {
    let todoItemComponents = [];

    for (let i = 0; i < this.state.todos.length; i++) {
      todoItemComponents = this.state.todos.map((todo) => {
        return (
          <li
            key={todo.id}
            draggable={true}
            className={(todo.completed) ? 'is-completed' : ''}
            onDragStart={() => {this.onDragStart(todo.order)}}
            onDragEnter={() => {this.onDragEnter(todo.order)}}
            onDragEnd={() => {this.onDragEnd()}}
          >
            <label>{todo.text}</label>
            <span
              onClick={() => {this.onClickDone(todo.id, todo.completed)}}
            >
              [DONE]
            </span>
            <span
              onClick={() => {this.onClickDestroy(todo.id, todo.order)}}
            >
              [DELETE]
            </span>
          </li>
        );
      });
    }
    return (
      <section>
        <h2>{this.props.category.name}</h2>
        <div onClick={() => {this.onClickAdd()}}>[Add]</div>
        <ul>{todoItemComponents}</ul>
      </section>
    );
  }
}
