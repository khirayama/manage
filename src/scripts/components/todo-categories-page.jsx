import React, { Component } from 'react';

import Header from './header';
import PageBackButton from './page-back-button';
import TodoCategoryList from './todo-category-list';


export default class TodoCategoriesPage extends Component {
  render() {
    const page = this.props.page;
    const todoCategories = this.props.todoCategories;

    return (
      <section className="page todo-categories-page">
        <section className="page-content">
          <PageBackButton />
          <TodoCategoryList todoCategories={todoCategories} />
        </section>
        <Header page={ page } position="bottom" />
      </section>
    );
  }
}

TodoCategoriesPage.propTypes = {
  page: React.PropTypes.string.isRequired,
  todoCategories: React.PropTypes.array.isRequired,
};
