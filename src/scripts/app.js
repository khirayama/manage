import TodoStore from './stores/TodoStore';

(() => {
  console.log('app start');
  TodoStore._create();
  console.log(TodoStore.get());
})();
