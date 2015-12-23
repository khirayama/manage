import React from 'react';
import ReactDOM from 'react-dom';

import logger from './utils/logger';
import AppStore from './stores/app-store';
import ManageApp from './components/ManageApp';


window.addEventListener('load', () => {
  logger.info(`Start manege app at ${new Date()}`);

  const appStore = new AppStore();

  ReactDOM.render(<ManageApp appStore={appStore} />, document.querySelector('#manage-app'));
});
