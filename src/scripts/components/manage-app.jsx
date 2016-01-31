import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import config from '../../config';
import {
  pages,
  keyCodes,
} from '../constants/constants';
import {
  showLauncher,
  hideLauncher,
} from '../actions/app-action-creators';
import Header from './header';
import Launcher from './launcher';
import TodosPage from './todos-page';
import MenuPage from './menu-page';
import TodoCategoriesPage from './todo-categories-page';
import SettingsPage from './settings-page';


const propTypes = {
  appStore: React.PropTypes.object.isRequired,
};

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

  _createPageElement() {
    const page = this.state.appStore.getPage();
    const title = this.state.appStore.getTitle();
    const isLauncherShowing = this.state.appStore.launcherStore.getLauncherShowing();
    const launcherElement = (isLauncherShowing) ? this._createLauncherElement() : null;

    this._changeTitle(title);

    switch (page) {
      case (pages.TODOS):
        const todos = this.state.appStore.todoStore.getTodos();

        return (
          <section key={ page } className="page-container">
            <Header page={ page } />
            <TodosPage page={ page } todos={todos} />
            { launcherElement }
          </section>
        );
      case (pages.MENU):
        return (
          <section key={ page } className="page-container">
            <Header page={ page } position="bottom" />
            <MenuPage page={page} />
            { launcherElement }
          </section>
        );
      case (pages.TODO_CATEGORIES):
        const todoCategories = this.props.appStore.todoCategoryStore.getTodoCategories();

        return (
          <section key={ page } className="page-container">
            <Header page={ page } position="bottom" />
            <TodoCategoriesPage page={page} todoCategories={todoCategories} />
            { launcherElement }
          </section>
        );
      case (pages.SETTINGS):
        return (
          <section key={ page } className="page-container">
            <Header page={ page } position="bottom" />
            <SettingsPage page={page} />
            { launcherElement }
          </section>
        );
      default:
        return (
          <section key={ page } className="page-container">
            <Header page={ page } position="bottom" />
            <div>404</div>
            { launcherElement }
          </section>
        );
    }
  }

  render() {
    const pageElement = this._createPageElement();
    const page = this.state.appStore.getPage();

    return (
      <div>
        { /* fade-in / fade-out */ }
        <ReactCSSTransitionGroup
          transitionName={ {
            appear: 'fade-in',
            enter: 'fade-in',
            leave: 'fade-out',
          } }
          transitionAppear
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
        { (page === pages.MENU) ? pageElement : null }
        </ReactCSSTransitionGroup>

        { /* fade-up / fade-down */ }
        <ReactCSSTransitionGroup
          transitionName={ {
            appear: 'slide-up',
            enter: 'slide-up',
            leave: 'slide-down',
          } }
          transitionAppear
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
        { (page === pages.TODOS) ? pageElement : null }
        </ReactCSSTransitionGroup>

        { /* fade-in / fade-out */ }
        <ReactCSSTransitionGroup
          transitionName={ {
            appear: 'slide-in',
            enter: 'slide-in',
            leave: 'slide-out',
          } }
          transitionAppear
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
        { (page === pages.TODO_CATEGORIES) ? pageElement : null }
        { (page === pages.SETTINGS) ? pageElement : null }
        </ReactCSSTransitionGroup>

      </div>
    );
  }
}

ManageApp.propTypes = propTypes;
