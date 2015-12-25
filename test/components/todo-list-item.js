import assert from 'power-assert';
import { jsdom } from 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import TodoListItem from '../../src/scripts/components/todo-list-item';


global.document = jsdom('<html><<body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

const todoListItemElement = ReactTestUtils.renderIntoDocument(React.createElement(TodoListItem, {
  todo: {
    id: 'dummy-id',
    text: 'AAA',
    completed: false,
  }
}));

describe('TodoListItem', () => {
  it('click done button', () => {
    let doneButton = ReactDOM.findDOMNode(todoListItemElement).querySelector('.done-button');
    ReactTestUtils.Simulate.click(doneButton);
  });
});

