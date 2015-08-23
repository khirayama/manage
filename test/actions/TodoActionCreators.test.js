import assert  from 'power-assert';
import {TODO_CATEGORY} from '../../src/scripts/constants/constants';
import TodoStore  from '../../src/scripts/stores/TodoStore';
import TodoActionCreators  from '../../src/scripts/actions/TodoActionCreators';
 
describe('TodoActionCreators', () => {
  beforeEach(() => {
    // FIXME: remove past state.
    TodoStore._data = {};
    TodoActionCreators.create({text: 'Hello World', category: TODO_CATEGORY.TODAY});
  });
  describe('create', () => {
    it('when empty', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello World');
      assert(todo.completed === false);
    });
  });
  describe('update', () => {
    it('when text', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      TodoActionCreators.update(todo.id, {text: 'Hello New World'});
      todos = TodoStore.get();
      todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello New World');
      assert(todo.completed === false);
    });
    it('when completed', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      TodoActionCreators.update(todo.id, {completed: true});
      todos = TodoStore.get();
      todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello World');
      assert(todo.completed === true);
    });
    it('when category', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      TodoActionCreators.update(todo.id, {category: TODO_CATEGORY.LATER});
      todos = TodoStore.get();
      todo = todos[0];

      assert(todos.length === 1);
      assert(todo.text === 'Hello World');
      assert(todo.completed === false);
      assert(todo.category === TODO_CATEGORY.LATER);
    });
  });
  describe('destroy', () => {
    it('when head todo', () => {
      let todos = TodoStore.get();
      let todo = todos[0];

      TodoActionCreators.destroy(todo.id);
      todos = TodoStore.get();

      assert(todos.length === 0);
    });
  });
});
