import React, { Component } from 'react';

export default class TodoCategoryListItem extends Component {
  render() {
    const todoCategory = this.props.todoCategory;

    return (
      <li key={ todoCategory.id }>
        <label>{ todoCategory.name }</label>
        <span>[DELETE]</span>
      </li>
    );
  }
}

TodoCategoryListItem.propTypes = {
  todoCategory: React.PropTypes.object.isRequired,
};
