import React, { Component } from 'react';

import config from '../../config';
import {
  pages,
  keyCodes,
} from '../constants/constants';
import {
  showLauncher,
  hideLauncher,
} from '../actions/app-action-creators';
import Launcher from './launcher';
import TodosPage from './todos-page';
import MenuPage from './menu-page';
import TodoCategoriesPage from './todo-categories-page';
import SettingsPage from './settings-page';


export default class ManageApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appStore: this.props.appStore,
    };

    this.updateState = this._updateState.bind(this);
  }

  componentDidMount() {
    this.props.appStore.addChangeListener(this.updateState);

    this._setDocumentEventHandler();
  }

  componentWillUnmount() {
    this.props.appStore.removeChangeListener(this.updateState);
  }

  _updateState() {
    this.setState({
      appStore: this.props.appStore,
    });
  }

  _changeTitle(title) {
    document.title = `${title} | ${config.name}`;
  }

  _setDocumentEventHandler() {
    document.addEventListener('keydown', event => {
      const keyCode = event.keyCode;
      const shift = event.shiftKey;
      const ctrl = event.ctrlKey || event.metaKey;

      switch (true) {
        case (keyCode === keyCodes.K && !shift && ctrl):
          const isLauncherShowing = this.state.appStore.launcherStore.getLauncherShowing();

          if (isLauncherShowing) {
            hideLauncher();
          } else {
            showLauncher();
          }
          break;
        default:
          break;
      }
    });
  }

  _createLauncherElement() {
    const contents = this.state.appStore.launcherStore.getContents();

    return (
      <Launcher
        contents={ contents }
      />
    );
  }

  render() {
    const page = this.state.appStore.getPage();
    const title = this.state.appStore.getTitle();
    const launcherElement = (this.state.appStore.launcherStore.getLauncherShowing()) ? this._createLauncherElement() : null;

    this._changeTitle(title);

    switch (page) {
      case (pages.TODOS):
        const todos = this.state.appStore.todoStore.getTodos();

        return (
          <section className="page-container">
            <TodosPage page={page} todos={todos} />
            { launcherElement }
          </section>
        );
      case (pages.MENU):
        return (
          <section className="page-container">
            <MenuPage page={page} />
            { launcherElement }
          </section>
        );
      case (pages.TODO_CATEGORIES):
        const todoCategories = this.props.appStore.todoCategoryStore.getTodoCategories();

        return (
          <section className="page-container">
            <TodoCategoriesPage page={page} todoCategories={todoCategories} />
            { launcherElement }
          </section>
        );
      case (pages.SETTINGS):
        return (
          <section className="page-container">
            <SettingsPage page={page} />
            { launcherElement }
          </section>
        );
      default:
        return (
          <section className="page-container">
            <div>404</div>
            { launcherElement }
          </section>
        );
    }
  }
}

ManageApp.propTypes = {
  appStore: React.PropTypes.object.isRequired,
};
