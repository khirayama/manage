import React, { Component } from 'react';
import TodoCategoryActionCreators from '../actions/TodoCategoryActionCreators';
import TodoCategoryItem from './TodoCategoryItem';

export default class TodoCategoryList extends Component {
  constructor(props) {
    super(props);
  }

  onClickAdd() {
    TodoCategoryActionCreators.create({ name: `Term ${this.props.todoCategories.length}`, order: this.props.todoCategories.length });
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

  render() {
    let todoCategoryItemComponents = [];

    todoCategoryItemComponents = this.props.todoCategories.map((todoCategory) => {
      return (
        <TodoCategoryItem
          key={todoCategory.id}
          todoCategory={todoCategory}
          _onClickDestroy={() => { this.onClickDestroy(todoCategory.id, todoCategory.order); }}
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
