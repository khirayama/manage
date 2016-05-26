import React, { Component } from 'react';

import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';
import PageBackButton from './page-back-button';


const propTypes = {};

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
    return (
      <section className="page menu-page">
        <section className="page-content">
          <PageBackButton />
          <section className="list menu-list">
            <header>
              <h2>Menu</h2>
            </header>
            <ul>
              <li
                className="list-item"
                onClick={ this.onClickShowTodos }
              >
                Show todos
              </li>
              <li
                className="list-item"
                onClick={ this.onClickShowTodoCategories }
              >
                Show todo categories
              </li>
              <li
                className="list-item"
                onClick={ this.onClickSettings }
              >
                Settings
              </li>
            </ul>
          </section>
        </section>
      </section>
    );
  }
}

MenuPage.propTypes = propTypes;
