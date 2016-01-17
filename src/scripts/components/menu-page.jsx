import React, { Component } from 'react';

import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';
import Header from './header';
import PageBackButton from './page-back-button';


const propTypes = {
  page: React.PropTypes.string.isRequired,
};

export default class MenuPage extends Component {
  constructor(props) {
    super(props);

    this.onClickShowTodos = this.onClickShowTodos.bind(this);
    this.onClickShowTodoCategories = this.onClickShowTodoCategories.bind(this);
    this.onClickSettings = this.onClickSettings.bind(this);
  }

  onClickShowTodos() {
    changePage(pages.TODOS);
  }

  onClickShowTodoCategories() {
    changePage(pages.TODO_CATEGORIES);
  }

  onClickSettings() {
    changePage(pages.SETTINGS);
  }

  render() {
    const page = this.props.page;

    return (
      <section className="page menu-page">
        <section className="page-content">
          <PageBackButton />
          <section className="menu-list">
            <h2>Menu</h2>
            <ul>
              <li
                className="menu-list-item"
                onClick={ this.onClickShowTodos }
              >
                Show todos
              </li>
              <li
                className="menu-list-item"
                onClick={ this.onClickShowTodoCategories }
              >
                Show todo categories
              </li>
              <li
                className="menu-list-item"
                onClick={ this.onClickSettings }
              >
                Settings
              </li>
            </ul>
          </section>
        </section>
        <Header page={ page } position="bottom" />
      </section>
    );
  }
}

MenuPage.propTypes = propTypes;
