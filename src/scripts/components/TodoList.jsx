import React from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem';
import SortableList from './SortableList';

export default class TodoList extends SortableList {
  constructor(props) {
    super(props);
    const _todos = TodoStore.where({ categoryId: this.props.todoCategory.id }).order('order').get();

    this.state = { todos: _todos };
    this._onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onUpdate);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onUpdate);
  }

  onUpdate() {
    const _todos = TodoStore.where({ categoryId: this.props.todoCategory.id }).order('order').get();

    this.setState({ todos: _todos });
  }

  onClickAdd() {
    TodoActions.create({ text: '', categoryId: this.props.todoCategory.id, order: this.state.todos.length });
    super.onClickAdd();
  }

  render() {
    let todoItemComponents = [];

    todoItemComponents = this.state.todos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          created={this._state.created}
          _onClickDestroy={() => { this.onClickDestroy(TodoActions, this.state.todos, todo.id, todo.order); }}
          _onDragStart={() => { this.onDragStart(todo.order); }}
          _onDragEnter={() => { this.onDragEnter(todo.order); }}
          _onDragEnd={() => { this.onDragEnd(TodoActions, this.state.todos); }}
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
