import React, { Component } from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    const _todos = TodoStore.where({ categoryId: this.props.todoCategory.id }).order('order').get();

    this.state = { todos: _todos };
    this._state = { from: 0, to: 0, created: true };
    this._onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onUpdate);
  }

  componentDidUpdate() {
    this._state.created = true;
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onUpdate);
  }

  onUpdate() {
    const _todos = TodoStore.where({ categoryId: this.props.todoCategory.id }).order('order').get();

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
    TodoActions.create({ text: `Hello World ${this.state.todos.length}`, categoryId: this.props.todoCategory.id, order: this.state.todos.length });
    this._state.created = false;
  }

  onClickDestroy(id, order) {
    for (let index = 0; index < this.state.todos.length; index++) {
      const todo = this.state.todos[index];

      if (index === order) {
        TodoActions.destroy(id);
      } else if (index > order) {
        TodoActions.update(todo.id, {order: todo.order - 1});
      }
    }
  }

  sortItem(from, to) {
    if (from < to) { // top to bottom
      for (let index = from; index <= to; index++) {
        const todo = this.state.todos[index];

        if (index === from) {
          TodoActions.update(todo.id, { order: to });
        } else if (index <= to) {
          TodoActions.update(todo.id, { order: todo.order - 1 });
        }
      }
    } else if (from > to) { // bottom to top
      for (let index = to; index <= from; index++) {
        const todo = this.state.todos[index];

        if (index === from) {
          TodoActions.update(todo.id, { order: to });
        } else if (index <= from) {
          TodoActions.update(todo.id, { order: todo.order + 1 });
        }
      }
    }
  }

  render() {
    let todoItemComponents = [];

    todoItemComponents = this.state.todos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          created={this._state.created}
          _onClickDestroy={() => { this.onClickDestroy(todo.id, todo.order); }}
          _onDragStart={() => { this.onDragStart(todo.order); }}
          _onDragEnter={() => { this.onDragEnter(todo.order); }}
          _onDragEnd={() => { this.onDragEnd(); }}
        />
      );
    });
    return (
      <section>
        <h2>{this.props.todoCategory.name}</h2>
        <div onClick={() => { this.onClickAdd(); }}>[Add]</div>
        <ul>{todoItemComponents}</ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todoCategory: React.PropTypes.object,
};
