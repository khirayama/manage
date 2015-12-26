import React, { Component } from 'react';

import TodoList from './todo-list';
import TodoCategoryList from './todo-category-list';

export default class ManageApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: this.props.appStore.todoStore.getTodos(),
      todoCategories: this.props.appStore.todoCategoryStore.getTodoCategories(),
    };

    this.updateState = this._updateState.bind(this);
  }

  componentDidMount() {
    this.props.appStore.addChangeListener(this.updateState);
  }

  componentWillUnmount() {
    this.props.appStore.removeChangeListener(this.updateState);
  }

  _updateState() {
    this.setState({
      todos: this.props.appStore.todoStore.getTodos(),
      todoCategories: this.props.appStore.todoCategoryStore.getTodoCategories(),
    });
  }

  render() {
    const todoListElements = this.state.todos.map((todoCategory) => {
      return <TodoList key={todoCategory.categoryId} todoCategory={todoCategory} />;
    });

    return (
      <section>
        <h1>Manage</h1>
        <TodoCategoryList todoCategories={this.state.todoCategories} />
        { todoListElements }
      </section>
    );
  }
}

ManageApp.propTypes = {
  appStore: React.PropTypes.object.isRequired,
};
