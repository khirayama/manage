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

    this.onClickSettings = this.onClickSettings.bind(this);
  }

  onClickSettings() {
    const HOME = pages.TASKS;
    let leftHref = HOME;

    if (this.props.page === HOME) {
      leftHref = pages.SETTINGS;
    }

    changePage(leftHref);
  }

  render() {
    return (
      <header
        key="header"
        className={classNames('app-header', { 'is-bottom': (this.props.position === 'bottom') })}
      >
        <div className="settings-button" onClick={this.onClickSettings}><span>S</span></div>
        <h1 className="app-title"><span>{config.name}</span></h1>
      </header>
    );
  }
}

Header.propTypes = propTypes;
