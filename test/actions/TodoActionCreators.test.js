import assert  from 'power-assert';
import TodoStore  from '../../src/scripts/stores/TodoStore';
import TodoActionCreators  from '../../src/scripts/actions/TodoActionCreators';
 
describe('TodoActionCreators', () => {
  beforeEach(() => {
    // FIXME: remove past state.
    TodoStore._data = {};
    TodoActionCreators.create('test text');
  });
  it('create', () => {
    let todos = TodoStore.get();
    let todo = todos[0];

    assert(todos.length === 1);
    assert(todo.text === 'test text');
  });
  it('update', () => {
    let todos = TodoStore.get();
    let todo = todos[0];

    TodoActionCreators.update(todo.id, {text: 'new test text'});
    todos = TodoStore.get();
    todo = todos[0];
    
    assert(todos.length === 1);
    assert(todo.text === 'new test text');
  });
  it('destroy', () => {
    let todos = TodoStore.get();
    let todo = todos[0];

    TodoActionCreators.destroy(todo.id);
    todos = TodoStore.get();
    
    assert(todos.length === 0);
  });
});
