import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  deleteTodoCategory,
} from '../actions/todo-category-action-creators';

export default class TodoCategoryListItem extends Component {
  onClickDeleteBtn() {
    deleteTodoCategory(this.props.todoCategory.id);
  }

  render() {
    const todoCategory = this.props.todoCategory;

    return (
      <li key={ todoCategory.id }>
        <label>{ todoCategory.name }</label>
        <span onClick={ this.onClickDeleteBtn.bind(this) }>[DELETE]</span>
      </li>
    );
  }
}

TodoCategoryListItem.propTypes = {
  todoCategory: React.PropTypes.object.isRequired,
};
