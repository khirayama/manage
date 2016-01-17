import React, { Component } from 'react';
import classNames from 'classnames';

import config from '../../config';
import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';


const propTypes = {
  page: React.PropTypes.string.isRequired,
  position: React.PropTypes.string,
};

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.onClickMenu = this.onClickMenu.bind(this);
    this.onClickSettings = this.onClickSettings.bind(this);
  }

  onClickMenu() {
    const HOME = pages.TODOS;
    let menuHref = HOME;

    if (this.props.page === HOME) {
      menuHref = pages.MENU;
    }

    changePage(menuHref);
  }

  onClickSettings() {
    const HOME = pages.TODOS;
    let settingsHref = pages.SETTINGS;

    if (this.props.page === pages.SETTINGS) {
      settingsHref = HOME;
    }

    changePage(settingsHref);
  }

  render() {
    return (
      <header
        key="header"
        className={ classNames('app-header', { 'is-bottom': (this.props.position === 'bottom') })}
      >
        <div className="menu-button" onClick={ this.onClickMenu }><span>M</span></div>
        <h1 className="app-title"><span>{ config.name }</span></h1>
        <div className="settings-button" onClick={ this.onClickSettings }><span>S</span></div>
      </header>
    );
  }
}

Header.propTypes = propTypes;
