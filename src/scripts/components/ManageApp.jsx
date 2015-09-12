import React, { Component } from 'react';
import TodoCategoryStore from '../stores/TodoCategoryStore';
import TodoActionCreators from '../actions/TodoActionCreators';
import TodoList from './TodoList';

export default class ManageApp extends Component {
  constructor(props) {
    super(props);
    let _categories = TodoCategoryStore.get();

    this.state = { categories: _categories };
  }

  componentDidMount() {
    TodoCategoryStore.addChangeListener(() => {this.onUpdate()});
  }

  componentWillUnmount() {
    TodoCategoryStore.removeChangeListener(() => {this.onUpdate()});
  }

  onUpdate() {
    let _categories = TodoCategoryStore.get();

    this.setState({ categories: _categories });
  }

  render() {
    let todoListComponents = [];

    for (let i = 0; i < this.state.categories.length; i++) {
      let category = this.state.categories[i];
      todoListComponents.push(<TodoList key={category.id} category={category} />);
    }
    return (
      <section>
        <h1>Manage</h1>
        {todoListComponents}
      </section>
    );
  }
}
