import TodoStore from './stores/TodoStore';

(() => {
  TodoStore._create();
  console.log(TodoStore.get());
})();
