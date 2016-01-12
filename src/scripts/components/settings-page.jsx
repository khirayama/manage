import React, { Component } from 'react';

import Header from './header';
import PageBackButton from './page-back-button';


export default class SettingsPage extends Component {
  render() {
    const page = this.props.page;

    return (
      <section className="page settings-page">
        <section className="page-content">
          <PageBackButton />
          <section className="setting-list">
            <h2>Settings</h2>
            <ul>
              <li className="setting-list-item">Number of column</li>
              <li className="setting-list-item">Extract schedule</li>
              <li className="setting-list-item">Custom style</li>
              <li className="setting-list-item">Clear all data</li>
            </ul>
          </section>
        </section>
        <Header page={ page } position="bottom" />
      </section>
    );
  }
}

SettingsPage.propTypes = {
  page: React.PropTypes.string.isRequired,
};
