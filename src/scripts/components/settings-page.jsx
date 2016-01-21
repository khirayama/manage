import React, { Component } from 'react';

import PageBackButton from './page-back-button';


const propTypes = {};

export default class SettingsPage extends Component {
  render() {
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
      </section>
    );
  }
}

SettingsPage.propTypes = propTypes;
