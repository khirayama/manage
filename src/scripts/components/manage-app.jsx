import React, { Component } from 'react';

import { pages } from '../constants/constants';
import { changePage, backPage } from '../actions/app-action-creators';
import Header from './header';
import TodoList from './todo-list';
import TodoCategoryList from './todo-category-list';

export default class ManageApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appStore: this.props.appStore,
    };

    this.updateState = this._updateState.bind(this);
  }

  componentDidMount() {
    this.props.appStore.addChangeListener(this.updateState);
  }

  componentWillUnmount() {
    this.props.appStore.removeChangeListener(this.updateState);
  }

  onClickLink(page) {
    changePage(page);
  }

  onClickBack() {
    backPage();
  }

  _updateState() {
    this.setState({
      appStore: this.props.appStore,
    });
  }

  _changeTitle(title) {
    document.title = `${title} | Manage`;
  }

  createTodosPage() {
    const page = this.state.appStore.getPage();
    const todos = this.props.appStore.todoStore.getTodos();

    this._changeTitle('Todos');

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

  createMenuPage() {
    const page = this.state.appStore.getPage();

    this._changeTitle('Menu');

    return (
      <section className="page menu-page">
        <section className="page-content">
          <div className="page-back-button" onClick={ this.onClickBack.bind(this) }>←</div>
          <ul className="menu-list">
            <li className="menu-list-item" onClick={ this.onClickLink.bind(this, pages.TODOS) }>Show todos</li>
            <li className="menu-list-item" onClick={ this.onClickLink.bind(this, pages.TODO_CATEGORIES) }>Show todo categories</li>
          </ul>
        </section>
        <Header page={ page } position="bottom" />
      </section>
    );
  }

  createTodoCategoriesPage() {
    const page = this.state.appStore.getPage();
    const todoCategories = this.props.appStore.todoCategoryStore.getTodoCategories();

    this._changeTitle('Todo categories');

    return (
      <section className="page todo-categories-page">
        <section className="page-content">
          <div className="page-back-button" onClick={ this.onClickBack.bind(this) }>←</div>
          <TodoCategoryList todoCategories={todoCategories} />
        </section>
        <Header page={ page } position="bottom" />
      </section>
    );
  }

  render() {
    const page = this.state.appStore.getPage();

    switch (page) {
      case (pages.TODOS):
        return this.createTodosPage();
      case (pages.MENU):
        return this.createMenuPage();
      case (pages.TODO_CATEGORIES):
        return this.createTodoCategoriesPage();
      default:
        return this.createTodosPage();
    }
  }
}

ManageApp.propTypes = {
  appStore: React.PropTypes.object.isRequired,
};
