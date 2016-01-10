import React, { Component } from 'react';

import { pages } from '../constants/constants';
import { hideLauncher } from '../actions/app-action-creators';
import { changePage } from '../actions/app-action-creators';
import { createTodo } from '../actions/todo-action-creators';
import { createTodoCategory } from '../actions/todo-category-action-creators';


export default class Launcher extends Component {
  onClickLauncher(event) {
    event.stopPropagation();
  }

  onClickTodoCategoryItem(categoryId) {
    hideLauncher();
    changePage(pages.TODOS);
    createTodo('', categoryId);
  }

  onClickCreateCategory() {
    hideLauncher();
    changePage(pages.TODO_CATEGORIES);
    createTodoCategory('');
  }

  onClickPageItem(page) {
    hideLauncher();
    changePage(page);
  }

  _createTodoCategoryItemElement() {
    return this.props.todoCategories.map(todoCategory => {
      return (
        <li
          key={ todoCategory.id }
          onClick={ this.onClickTodoCategoryItem.bind(this, todoCategory.id) }
        >
          Create a todo to { todoCategory.name }
        </li>
      );
    });
  }

  _createPageItemElement() {
    return this.props.pages.map((page, index) => {
      return (
        <li
          key={`page-${index}`}
          onClick={ this.onClickPageItem.bind(this, page.href) }
        >
          Move to {page.name} page
        </li>
      );
    });
  }

  render() {
    const todoCategoryItemElements = this._createTodoCategoryItemElement();
    const pageItemElements = this._createPageItemElement();

    return (
      <div
        className="launcher-background"
        onClick={ hideLauncher }
      >
        <div
          className="launcher"
          onClick={ (event) => { this.onClickLauncher(event) } }
        >
          <input autoFocus type="text" />
          <ul>{ todoCategoryItemElements }</ul>
          <ul>
            <li
              onClick={ this.onClickCreateCategory.bind(this) }
            >
              Create a category
            </li>
          </ul>
          <ul>{ pageItemElements }</ul>
        </div>
      </div>
    );
  }
}

Launcher.propTypes = {
};
