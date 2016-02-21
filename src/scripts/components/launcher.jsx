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
import LauncherListItem from './launcher-list-item';


const propTypes = {
  contents: React.PropTypes.array.isRequired,
};

export default class Launcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      contentIndex: 0,
      filteredContents: this.props.contents,
    };

    this.onKeyDownInput = this.onKeyDownInput.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.callAction = this.callAction.bind(this);
  }

  onKeyDownInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;
    let contentIndex;
    let content = [];

    switch (true) {
      case (keyCode === keyCodes.ENTER && !shift && !ctrl):
        content = this.state.filteredContents[this.state.contentIndex];

        this.callAction(content);
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
      case (keyCode === keyCodes.ESC && !shift && !ctrl):
        hideLauncher();
        break;
      default:
        break;
    }
  }

  onChangeInput(event) {
    const value = event.target.value;
    const filteredContents = Launcher._filterContents(this.props.contents, value);

    this.setState({ value, filteredContents });
  }

  callAction(content) {
    if (this.state.filteredContents.length === 0) {
      return;
    }

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
    const isSelected = (this.state.contentIndex === index);

    return (
      <LauncherListItem
        key={ `content-${index}` }
        content={ content }
        isSelected={ isSelected }
        callAction={ this.callAction }
      />
    );
  }

  _createNoResultItem() {
    return [
      <li key="launcher-list-item-no-results" className="launcher-list-item">No results</li>,
    ];
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
    let contentElements;

    if (this.state.filteredContents.length !== 0) {
      contentElements = this.state.filteredContents.map(
        (content, index) => this._createContentItemElement(content, index)
      );
    } else {
      contentElements = this._createNoResultItem();
    }

    return (
      <div
        className="launcher-background"
        onClick={ hideLauncher }
      >
        <div className="launcher">
          <input
            autoFocus
            placeholder="Search shortcut"
            type="text"
            onKeyDown={ this.onKeyDownInput }
            onChange={ this.onChangeInput }
            value={ this.state.value }
          />
          <ul className="launcher-list">{ contentElements }</ul>
        </div>
      </div>
    );
  }
}

Launcher.propTypes = propTypes;
