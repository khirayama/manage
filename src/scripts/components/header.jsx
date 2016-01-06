import React, { Component } from 'react';
import classNames from 'classnames';

import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';


export default class Header extends Component {
  onClickLink(page) {
    changePage(page);
  }

  render() {
    const page = this.props.page;
    let href;

    switch (page) {
      case (pages.TODOS):
        href = pages.MENU;
        break;
      default:
        href = pages.TODOS;
        break;
    }

    return (
      <header className={ classNames('app-header', { 'is-bottom': (this.props.position === 'bottom') })} >
        <div className="menu-button" onClick={ this.onClickLink.bind(this, href) }><span>M</span></div>
      </header>
    );
  }
}

Header.propTypes = {
  page: React.PropTypes.string.isRequired,
  position: React.PropTypes.string,
};
