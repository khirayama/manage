import todoCategoryResouce from '../resources/todo-category-resource';
import { changePage } from '../actions/app-action-creators';
import {
  createTodo,
  createTodoCategory,
} from '../actions/todo-action-creators';
import { pages } from '../constants/constants';


export function getLauncherContents() {
  const todoCategoryItems = todoCategoryResouce.order('order').get().map(todoCategory => {
    const id = todoCategory.id;
    const text = `Create a todo to ${todoCategory.name}`;
    const callback = () => {
      changePage(pages.TODOS);
      createTodo('', id);
    };

    return { text, callback };
  });

  const createCategoryItem = {
    text: 'Create a category',
    callback: () => {
      changePage(pages.TODO_CATEGORIES);
      createTodoCategory('');
    },
  };

  const pageItems = Object.keys(pages).map(key => {
    const name_ = pages[key].replace(/_/g, ' ').toLowerCase();
    const name = name_.charAt(0).toUpperCase() + name_.slice(1);
    const href = pages[key];
    const text = `Move to ${name}`;
    const callback = () => {
      changePage(href);
    };

    return { text, callback };
  });

  return [...todoCategoryItems, createCategoryItem, ...pageItems];
}
