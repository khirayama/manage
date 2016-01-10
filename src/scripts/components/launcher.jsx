import React, { Component } from 'react';

import {
  pages,
  keyCodes,
  launcherContentTypes,
} from '../constants/constants';
import { hideLauncher } from '../actions/app-action-creators';
import { changePage } from '../actions/app-action-creators';
import { createTodo } from '../actions/todo-action-creators';
import { createTodoCategory } from '../actions/todo-category-action-creators';


export default class Launcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      contentIndex: 0,
      filteredContents: this.props.contents,
    };
  }

  onKeyDownInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;
    let contentIndex;

    switch (true) {
      case (keyCode === keyCodes.ENTER && !shift && !ctrl):
        const content = this.state.filteredContents[this.state.contentIndex];

        this._callAction(content);
        break;
      case (keyCode === keyCodes.UP && !shift && !ctrl):
        event.preventDefault();
        contentIndex = this.state.contentIndex - 1;
        if (contentIndex < 0) {
          contentIndex = this.state.filteredContents.length - 1;
        }
        this.setState({ contentIndex });
        break;
      case (keyCode === keyCodes.DOWN && !shift && !ctrl):
        event.preventDefault();
        contentIndex = this.state.contentIndex + 1;
        if (contentIndex > this.state.filteredContents.length - 1) {
          contentIndex = 0;
        }
        this.setState({ contentIndex });
        break;
      default:
        break;
    }
  }

  onChangeInput(value) {
    const filteredContents = Launcher._filterContents(this.props.contents, value);

    this.setState({ value, filteredContents });
  }

  _callAction(content) {
    switch (content.type) {
      case (launcherContentTypes.TODO):
        this._createTodo(content.id);
        break;
      case (launcherContentTypes.TODO_CATEGORY):
        this._createTodoCategory();
        break;
      case (launcherContentTypes.PAGE):
        this._movePage(content.href);
        break;
      default:
        break;
    }
  }

  _createTodo(categoryId) {
    hideLauncher();
    changePage(pages.TODOS);
    createTodo('', categoryId);
  }

  _createTodoCategory() {
    hideLauncher();
    changePage(pages.TODO_CATEGORIES);
    createTodoCategory('');
  }

  _movePage(page) {
    hideLauncher();
    changePage(page);
  }

  _createContentItemElement(content, index) {
    const className = (this.state.contentIndex === index) ? 'is-selected' : '';

    return (
      <li
        key={ `content-${index}` }
        className={ className }
        onClick={ this._callAction.bind(this, content) }
      >
        { content.text }
      </li>
    );
  }

  static _filterContents(contents, searchText) {
    const filteredContents = contents.concat();
    const searchWords = searchText.split(' ');

    searchWords.forEach(searchWord => {
      filteredContents.forEach((content, index) => {
        if (content && content.text.toUpperCase().indexOf(searchWord.toUpperCase()) === -1) {
          filteredContents.splice(index, 1, false);
        }
      });
    });

    return filteredContents.filter(el => Boolean(el));
  }

  render() {
    const contentElements = this.state.filteredContents.map((content, index) => {
      return this._createContentItemElement(content, index);
    });

    return (
      <div
        className="launcher-background"
        onClick={ hideLauncher }
      >
        <div
          className="launcher"
          onClick={ (event) => { event.stopPropagation(); } }
        >
          <input
            autoFocus
            type="text"
            onKeyDown={ event => { this.onKeyDownInput(event); } }
            onChange={ event => { this.onChangeInput(event.target.value); } }
            value={ this.state.value }
          />
          <ul>{ contentElements }</ul>
        </div>
      </div>
    );
  }
}

Launcher.propTypes = {
  contents: React.PropTypes.array.isRequired,
};
