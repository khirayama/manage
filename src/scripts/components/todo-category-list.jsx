import React, { Component } from 'react';

import {
  deleteTodoCategory,
} from '../actions/todo-category-action-creators';
import TodoCategoryListItem from './todo-category-list-item';


export default class TodoCategoryList extends Component {
  _createTodoCategoryListItemElement(todoCategory) {
    return (
      <TodoCategoryListItem
        key={todoCategory.id}
        todoCategory={todoCategory}
      />
    );
  }

  render() {
    const todoCategoryListItemElements = this.props.todoCategories.map((todoCategory) => {
      return this._createTodoCategoryListItemElement(todoCategory);
    });

    return (
      <section>
        <h2>CATEGORIES</h2>
        <div>[Add]</div>
        <ul>{todoCategoryListItemElements}</ul>
      </section>
    );
  }
}

TodoCategoryList.propTypes = {
  todoCategories: React.PropTypes.array.isRequired,
};
