import React, { Component } from 'react';

import { pages } from '../constants/constants';
import { changePage, backPage } from '../actions/app-action-creators';
import Header from './header';


export default class MenuPage extends Component {
  render() {
    const page = this.props.page;

    return (
      <section className="page menu-page">
        <section className="page-content">
          <div className="page-back-button" onClick={ backPage }>←</div>
          <ul className="menu-list">
            <li className="menu-list-item" onClick={ changePage.bind(this, pages.TODOS) }>Show todos</li>
            <li className="menu-list-item" onClick={ changePage.bind(this, pages.TODO_CATEGORIES) }>Show todo categories</li>
          </ul>
        </section>
        <Header page={ page } position="bottom" />
      </section>
    );
  }
}

MenuPage.propTypes = {
  page: React.PropTypes.string.isRequired,
};
