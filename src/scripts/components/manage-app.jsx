import React, { Component } from 'react';

// import TodoList from './TodoList';
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
    // const todoListComponents = [];
    //
    // for (let index = 0; index < this.state.todoCategories.length; index++) {
    //   const todoCategory = this.state.todoCategories[index];
    //   todoListComponents.push(<TodoList key={todoCategory.id} todoCategory={todoCategory} />);
    // }
    return (
      <section>
        <h1>Manage</h1>
        {/* {todoListComponents} */}
        <TodoCategoryList todoCategories={this.state.todoCategories} />
      </section>
    );
  }
}
