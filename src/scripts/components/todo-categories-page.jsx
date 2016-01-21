import React, { Component } from 'react';

import PageBackButton from './page-back-button';
import TodoCategoryList from './todo-category-list';


const propTypes = {
  todoCategories: React.PropTypes.array.isRequired,
};

export default class TodoCategoriesPage extends Component {
  render() {
    const todoCategories = this.props.todoCategories;

    return (
      <section className="page todo-categories-page">
        <section className="page-content">
          <PageBackButton />
          <TodoCategoryList todoCategories={todoCategories} />
        </section>
      </section>
    );
  }
}

TodoCategoriesPage.propTypes = propTypes;
