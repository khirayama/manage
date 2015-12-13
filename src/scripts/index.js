import React from 'react';
import ReactDOM from 'react-dom';

import ManageApp from './components/ManageApp';


window.addEventListener('load', () => {
  ReactDOM.render(<ManageApp />, document.querySelector('#manage-app'));
});
