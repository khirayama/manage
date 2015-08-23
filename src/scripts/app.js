import TodoStore from './stores/TodoStore';
import TodoActionCreators from './actions/TodoActionCreators';

(() => {
  TodoActionCreators.create('test text');
  console.log(TodoStore.get());
})();
