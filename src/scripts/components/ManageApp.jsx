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

  onClick() {
    TodoActionCreators.create({ text: 'Hello World', categoryId: this.state.categories[0].id });
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
        <div onClick={() => {this.onClick()}}>Add todo</div>
        {todoListComponents}
      </section>
    );
  }
}
