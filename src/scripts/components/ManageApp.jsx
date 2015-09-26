import React, { Component } from 'react';
import TodoCategoryStore from '../stores/TodoCategoryStore';
import TodoList from './TodoList';
import TodoCategoryList from './TodoCategoryList';

export default class ManageApp extends Component {
  constructor(props) {
    super(props);
    const _todoCategories = TodoCategoryStore.order('order').get();

    this.state = { todoCategories: _todoCategories };
  }

  componentDidMount() {
    TodoCategoryStore.addChangeListener(() => { this.onUpdate(); });
  }

  componentWillUnmount() {
    TodoCategoryStore.removeChangeListener(() => { this.onUpdate(); });
  }

  onUpdate() {
    const _todoCategories = TodoCategoryStore.order('order').get();

    this.setState({ todoCategories: _todoCategories });
  }

  render() {
    const todoListComponents = [];

    for (let index = 0; index < this.state.todoCategories.length; index++) {
      const todoCategory = this.state.todoCategories[index];
      todoListComponents.push(<TodoList key={todoCategory.id} todoCategory={todoCategory} />);
    }
    return (
      <section>
        <h1>Manage</h1>
        {todoListComponents}
        <TodoCategoryList todoCategories={this.state.todoCategories} />
      </section>
    );
  }
}
