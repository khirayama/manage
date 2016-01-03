import React, { Component } from 'react';

import { pages } from '../constants/constants';
import { changePage, backPage } from '../actions/app-action-creators';
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

  createTodosPage() {
    const todos = this.props.appStore.todoStore.getTodos();

    const todoListElements = todos.map((todoCategory) => {
      return <TodoList key={todoCategory.categoryId} todoCategory={todoCategory} />;
    });

    return (
      <section>
        <span onClick={ this.onClickLink.bind(this, pages.MENU) }>Menu</span>
        { todoListElements }
      </section>
    );
  }

  createMenuPage() {
    return (
      <ul>
        <li onClick={ this.onClickBack.bind(this) }>Back</li>
        <li onClick={ this.onClickLink.bind(this, pages.TODOS) }>Show todos</li>
        <li onClick={ this.onClickLink.bind(this, pages.TODO_CATEGORIES) }>Show todo categories</li>
      </ul>
    );
  }

  createTodoCategoriesPage() {
    const todoCategories = this.props.appStore.todoCategoryStore.getTodoCategories();

    return (
      <section>
        <div onClick={ this.onClickBack.bind(this) }>Back</div>
        <div onClick={ this.onClickLink.bind(this, pages.TODOS) }>Show todos</div>
        <TodoCategoryList todoCategories={todoCategories} />
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
