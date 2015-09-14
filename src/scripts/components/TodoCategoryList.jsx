import React, { Component } from 'react';
import TodoCategoryActionCreators from '../actions/TodoCategoryActionCreators';
import TodoCategoryItem from './TodoCategoryItem';

export default class TodoCategoryList extends Component {
  constructor(props) {
    super(props);

    this._state = { from: 0, to: 0, created: true };
  }

  componentDidUpdate() {
    this._state.created = true;
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
    TodoCategoryActionCreators.create({ name: 'New List', order: this.props.todoCategories.length });
    this._state.created = false;
  }

  onClickDestroy(id, order) {
    for (let i = 0; i < this.props.todoCategories.length; i++) {
      const todoCategory = this.props.todoCategories[i];

      if (i === order) {
        TodoCategoryActionCreators.destroy(id);
      } else if (i > order) {
        TodoCategoryActionCreators.update(todoCategory.id, {order: todoCategory.order - 1});
      }
    }
  }

  sortItem(from, to) {
    if (from < to) { // top to bottom
      for (let i = from; i <= to; i++) {
        const todoCategory = this.props.todoCategories[i];

        if (i === from) {
          TodoCategoryActionCreators.update(todoCategory.id, { order: to });
        } else if (i <= to) {
          TodoCategoryActionCreators.update(todoCategory.id, { order: todoCategory.order - 1 });
        }
      }
    } else if (from > to) { // bottom to top
      for (let i = to; i <= from; i++) {
        const todoCategory = this.props.todoCategories[i];

        if (i === from) {
          TodoCategoryActionCreators.update(todoCategory.id, { order: to });
        } else if (i <= from) {
          TodoCategoryActionCreators.update(todoCategory.id, { order: todoCategory.order + 1 });
        }
      }
    }
  }

  render() {
    let todoCategoryItemComponents = [];

    todoCategoryItemComponents = this.props.todoCategories.map((todoCategory) => {
      return (
        <TodoCategoryItem
          key={todoCategory.id}
          todoCategory={todoCategory}
          created={this._state.created}
          _onClickDestroy={() => { this.onClickDestroy(todoCategory.id, todoCategory.order); }}
          _onDragStart={() => { this.onDragStart(todoCategory.order); }}
          _onDragEnter={() => { this.onDragEnter(todoCategory.order); }}
          _onDragEnd={() => { this.onDragEnd(); }}
        />
      );
    });
    return (
      <section>
        <h2>CATEGORIES</h2>
        <div onClick={() => { this.onClickAdd(); }}>[Add]</div>
        <ul>{todoCategoryItemComponents}</ul>
      </section>
    );
  }
}

TodoCategoryList.propTypes = {
  todoCategories: React.PropTypes.array,
};
