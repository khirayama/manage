import React from 'react';
import ReactDOM from 'react-dom';
import ManageApp from './components/ManageApp';

export default class App {
  constructor() {
    ReactDOM.render(<ManageApp />, document.querySelector('#manage-app'));
  }
}
