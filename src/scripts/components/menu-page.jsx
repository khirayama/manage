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
          <div className="menu-list-container">
            <section className="list">
              <header>
                <h2>Menu</h2>
              </header>
              <ul>
                <li
                  className="list-item"
                  onClick={ this.onClickShowTodos }
                >
                  <div className="list-item-text">Show todos</div>
                </li>
                <li
                  className="list-item"
                  onClick={ this.onClickShowTodoCategories }
                >
                  <div className="list-item-text">Show todo categories</div>
                </li>
                <li
                  className="list-item"
                  onClick={ this.onClickSettings }
                >
                  <div className="list-item-text">Settings</div>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </section>
    );
  }
}

MenuPage.propTypes = propTypes;
