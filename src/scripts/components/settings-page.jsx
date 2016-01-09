import React, { Component } from 'react';

import { backPage } from '../actions/app-action-creators';
import Header from './header';


export default class SettingsPage extends Component {
  render() {
    const page = this.props.page;

    return (
      <section className="page settings-page">
        <section className="page-content">
          <div className="page-back-button" onClick={ backPage }>←</div>
          <ul className="setting-list">
            <li className="setting-list-item">Number of column</li>
            <li className="setting-list-item">Extract schedule</li>
            <li className="setting-list-item">Custom style</li>
            <li className="setting-list-item">Clear all data</li>
          </ul>
        </section>
        <Header page={ page } position="bottom" />
      </section>
    );
  }
}

SettingsPage.propTypes = {
  page: React.PropTypes.string.isRequired,
};
