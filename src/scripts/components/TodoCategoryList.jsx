import React from 'react';
import TodoCategoryActions from '../actions/TodoCategoryActions';
import TodoCategoryItem from './TodoCategoryItem';
import SortableList from './SortableList';

export default class TodoCategoryList extends SortableList {
  constructor(props) {
    super(props);
  }

  onClickAdd() {
    TodoCategoryActions.create({ name: '', order: this.props.todoCategories.length });
    super.onClickAdd();
  }

  render() {
    let todoCategoryItemComponents = [];

    todoCategoryItemComponents = this.props.todoCategories.map((todoCategory) => {
      return (
        <TodoCategoryItem
          key={todoCategory.id}
          todoCategory={todoCategory}
          created={this._state.created}
          _onClickDestroy={() => { this.onClickDestroy(TodoCategoryActions, this.props.todoCategories, todoCategory.id, todoCategory.order); }}
          _onDragStart={() => { this.onDragStart(todoCategory.order); }}
          _onDragEnter={() => { this.onDragEnter(todoCategory.order); }}
          _onDragEnd={() => { this.onDragEnd(TodoCategoryActions, this.props.todoCategories); }}
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
