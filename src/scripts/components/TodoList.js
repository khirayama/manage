import React, { Component } from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActionCreators from '../actions/TodoActionCreators';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    const _todos = TodoStore.where({ categoryId: this.props.category.id }).order('order').get();

    this.state = { todos: _todos };
    this._state = { from: 0, to: 0 };
  }

  componentDidMount() {
    TodoStore.addChangeListener(() => { this.onUpdate(); });
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(() => { this.onUpdate(); });
  }

  onUpdate() {
    const _todos = TodoStore.where({ categoryId: this.props.category.id }).order('order').get();

    this.setState({ todos: _todos });
  }

  onDragStart(order) {
    this._state.from = order;
  }

  onDragEnter(order) {
    this._state.to = order;
  }

  onDragEnd() {
    const from = this._state.from;
    const to = this._state.to;

    this.sortItem(from, to);
  }

  onClickAdd() {
    TodoActionCreators.create({ text: `Hello World ${this.state.todos.length}`, categoryId: this.props.category.id, order: this.state.todos.length });
  }

  onClickDone(id, completed) {
    TodoActionCreators.update(id, { completed: !completed });
  }

  onClickDestroy(id, order) {
    for (let i = 0; i < this.state.todos.length; i++) {
      const todo = this.state.todos[i];

      if (i === order) {
        TodoActionCreators.destroy(id);
      } else if (i > order) {
        TodoActionCreators.update(todo.id, {order: todo.order - 1});
      }
    }
  }

  sortItem(from, to) {
    if (from < to) { // top to bottom
      for (let i = from; i <= to; i++) {
        const todo = this.state.todos[i];

        if (i === from) {
          TodoActionCreators.update(todo.id, { order: to });
        } else if (i <= to) {
          TodoActionCreators.update(todo.id, { order: todo.order - 1 });
        }
      }
    } else if (from > to) { // bottom to top
      for (let i = to; i <= from; i++) {
        const todo = this.state.todos[i];

        if (i === from) {
          TodoActionCreators.update(todo.id, { order: to });
        } else if (i <= from) {
          TodoActionCreators.update(todo.id, { order: todo.order + 1 });
        }
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
            onDragStart={() => { this.onDragStart(todo.order); }}
            onDragEnter={() => { this.onDragEnter(todo.order); }}
            onDragEnd={() => { this.onDragEnd(); }}
          >
            <label>{todo.text}</label>
            <span
              onClick={() => { this.onClickDone(todo.id, todo.completed); }}
            >
              [DONE]
            </span>
            <span
              onClick={() => { this.onClickDestroy(todo.id, todo.order); }}
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
        <div onClick={() => { this.onClickAdd(); }}>[Add]</div>
        <ul>{todoItemComponents}</ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  category: React.PropTypes.object,
};
