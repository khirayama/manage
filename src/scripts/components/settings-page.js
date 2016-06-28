import React from 'react';
import config from '../../config';

import PageBackButton from './page-back-button';


export default function SettingsPage() {
  return (
    <section className="page settings-page">
      <section className="page-content">
        <PageBackButton text="[x]" />
        <div className="setting-list-container">
          <section className="list">
            <header className="list-header">
              <div className="list-header-content">
                <h3 className="list-header-text" >Settings</h3>
              </div>
            </header>
            <ul>
              <li className="list-item">
                <div className="list-item-text">Extract schedule</div>
              </li>
              <li className="list-item">
                <div className="list-item-text">Clear all data</div>
              </li>
            </ul>
          </section>
          <ul className="list">
            <li className="list-item">
              <div className="list-item-text">Help</div>
            </li>
            <li className="list-item">
              <div className="list-item-text">Policy</div>
            </li>
          </ul>
          <section className="list">
            <ul>
              <li className="list-item">
                <div className="list-item-text">Sign Out</div>
              </li>
              <li className="list-item">
                <div className="list-item-text">Delete account</div>
              </li>
            </ul>
            <footer>
              <small>2015- © {config.name}</small>
            </footer>
          </section>
        </div>
      </section>
    </section>
  );
}
