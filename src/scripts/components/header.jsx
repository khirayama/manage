import React, { Component } from 'react';
import classNames from 'classnames';

import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';


export default class Header extends Component {
  onClickLink(page) {
    changePage(page);
  }

  render() {
    const HOME = pages.TODOS;
    const page = this.props.page;
    let menuHref = HOME;
    let settingsHref = pages.SETTINGS;

    switch (page) {
      case (pages.TODOS):
        menuHref = pages.MENU;
        break;
      case (pages.SETTINGS):
        settingsHref = HOME;
        break;
      default:
        break;
    }

    return (
      <header key="header" className={ classNames('app-header', { 'is-bottom': (this.props.position === 'bottom') })} >
        <div className="menu-button" onClick={ this.onClickLink.bind(this, menuHref) }><span>M</span></div>
        <h1 className="app-title"><span>Manage</span></h1>
        <div className="settings-button" onClick={ this.onClickLink.bind(this, settingsHref) }><span>S</span></div>
      </header>
    );
  }
}

Header.propTypes = {
  page: React.PropTypes.string.isRequired,
  position: React.PropTypes.string,
};
