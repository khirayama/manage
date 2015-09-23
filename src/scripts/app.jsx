import React from 'react';
import ManageApp from './components/ManageApp';

(() => {
  React.render(<ManageApp />, document.querySelector('#manage-app'));
})();

import Utils from './utils/Utils';
let utils = new Utils();
let item;
item = utils.parseTextToItem('this fri meets my friend A');
console.log('this test:', item);
item = utils.parseTextToItem('next fri meets my friend B');
console.log('next test:', item);
item = utils.parseTextToItem('9/22 meets my friend C');
console.log('date test:', item);
item = utils.parseTextToItem('10/22 meets my friend D');
console.log('date test:', item);
item = utils.parseTextToItem('10/9 meets my friend E');
console.log('date test:', item);
