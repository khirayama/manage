import React, { Component } from 'react';

import Header from './header';
import TodoList from './todo-list';


export default class TodosPage extends Component {
  render() {
    const page = this.props.page;
    const todos = this.props.todos;

    const todoListElements = todos.map((todoCategory) => {
      return <TodoList key={todoCategory.categoryId} todoCategory={todoCategory} />;
    });

    return (
      <section className="page todos-page">
        <Header page={ page } />
        <section className="page-content">
          { todoListElements }
        </section>
      </section>
    );
  }
}

TodosPage.propTypes = {
  page: React.PropTypes.string.isRequired,
  todos: React.PropTypes.array.isRequired,
};
