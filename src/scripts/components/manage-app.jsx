import React, { Component } from 'react';

import { pages } from '../constants/constants';
import TodosPage from './todos-page';
import MenuPage from './menu-page';
import TodoCategoriesPage from './todo-categories-page';


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

  _updateState() {
    this.setState({
      appStore: this.props.appStore,
    });
  }

  _changeTitle(title) {
    document.title = `${title} | Manage`;
  }

  render() {
    const page = this.state.appStore.getPage();

    switch (page) {
      case (pages.TODOS):
        const todos = this.state.appStore.todoStore.getTodos();

        this._changeTitle('Todos');

        return <TodosPage page={page} todos={todos} />;
      case (pages.MENU):
        this._changeTitle('Menu');

        return <MenuPage page={page} />;
      case (pages.TODO_CATEGORIES):
        const todoCategories = this.props.appStore.todoCategoryStore.getTodoCategories();

        this._changeTitle('Todo categories');

        return <TodoCategoriesPage page={page} todoCategories={todoCategories} />;
      default:
        return <div>404</div>;
    }
  }
}

ManageApp.propTypes = {
  appStore: React.PropTypes.object.isRequired,
};
