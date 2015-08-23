import React from 'react';
import TodoApp from './components/TodoApp';

(() => {
  console.log('app start');
  React.render(<TodoApp />, document.querySelector('#todo-app'));
})();
