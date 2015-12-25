import assert from 'power-assert';
import { jsdom } from 'jsdom';
import React from 'React';
import ReactTestUtils from 'react-addons-test-utils';
import TodoListItem from '../../src/scripts/components/todo-list-item';


global.document = jsdom('<html><<body></body></html>');
global.window = document.defaultView;

ReactTestUtils.renderIntoDocument(React.createElement(TodoListItem, {
  todo: {
    id: 'dummy-id',
    text: 'AAA',
    completed: false,
  }
}));
