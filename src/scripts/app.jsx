import React from 'react';
import TodoApp from './components/TodoApp';

(() => {
  React.render(<TodoApp />, document.querySelector('#todo-app'));
})();
