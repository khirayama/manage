import React from 'react';
import {Component} from 'react';
import TodoStore from '../stores/TodoStore';

export default class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todos: TodoStore.get()
    };
    this._onChange = this.__onChange.bind(this);
  }
  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }
  render() {
    return <div>Hello World</div>;
  }
  __onChange() {
    this.setState({
      todos: TodoStore.get()
    });
  }
}
