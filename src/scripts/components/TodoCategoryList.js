import React, { Component } from 'react';
import TodoCategoryActionCreators from '../actions/TodoCategoryActionCreators';

export default class TodoCategoryList extends Component {
  constructor(props) {
    super(props);
  }

  onClickAdd() {
    TodoCategoryActionCreators.create({ name: `Term ${this.props.categories.length}`, order: this.props.categories.length });
  }

  render() {
    let todoCategoryItemComponents = [];

    todoCategoryItemComponents = this.props.categories.map((category) => {
      return (<li key={category.id}>{category.name}</li>);
    });
    return (
      <section>
        <h2>CATEGORIES</h2>
        <div onClick={() => { this.onClickAdd(); }}>[Add]</div>
        <ul>{todoCategoryItemComponents}</ul>
      </section>
    );
  }
}

TodoCategoryList.propTypes = {
  categories: React.PropTypes.array,
};
