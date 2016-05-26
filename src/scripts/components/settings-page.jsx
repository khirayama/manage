import React, { Component } from 'react';

import PageBackButton from './page-back-button';


const propTypes = {};

export default class SettingsPage extends Component {
  render() {
    return (
      <section className="page settings-page">
        <section className="page-content">
          <PageBackButton />
          <section className="list setting-list">
            <header>
              <h2>Settings</h2>
            </header>
            <ul>
              <li className="list-item">Extract schedule</li>
              <li className="list-item">Clear all data</li>
            </ul>
          </section>
        </section>
      </section>
    );
  }
}

SettingsPage.propTypes = propTypes;
