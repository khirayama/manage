import TodoStore from './stores/TodoStore';
import TodoActionCreators from './actions/TodoActionCreators';

(() => {
  TodoActionCreators.create('test text');
  TodoActionCreators.create('test text 2');

  let todos = TodoStore.get();
  console.log(TodoStore.get());
  TodoActionCreators.update(todos[0].id, {text: 'test text 3'});
  console.log(TodoStore.get());
  TodoActionCreators.destroy(todos[1].id);
  console.log(TodoStore.get());
})();
