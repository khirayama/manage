import appDispatcher from '../dispatchers/app-dispatcher';
import todoCategoryStorage from '../storages/todo-category-storage';
import todoStorage from '../storages/todo-storage';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema';
import {
  TODO_CATEGORY_STORAGE_SCHEMA,
  TODO_CATEGORIES_STORAGE_SCHEMA,
} from '../json-schemas/todo-category-storage';
import { getTodos } from './todo-action-creators';


export function getTodoCategories() {
  const allTodoCategories = todoCategoryStorage.order('order').get();

  validateByJSONSchema(allTodoCategories, TODO_CATEGORIES_STORAGE_SCHEMA);

  for (let index = 0; index < allTodoCategories.length; index++) {
    const todoCategory = allTodoCategories[index];

    todoCategory.isEditing = false;
    todoCategory.numberOfTodos = todoStorage.where({ categoryId: todoCategory.id }).get().length;
  }

  appDispatcher.emit(types.GET_ALL_TODO_CATEGORIES, allTodoCategories);
}

export function createTodoCategory(name) {
  const order = todoCategoryStorage.all().length;
  const entity = todoCategoryStorage.create({
    name,
    order,
  });

  validateByJSONSchema(entity, TODO_CATEGORY_STORAGE_SCHEMA);

  entity.isEditing = true;
  entity.numberOfTodos = todoStorage.where({ categoryId: entity.id }).get().length;

  getTodos();
  appDispatcher.emit(types.CREATE_TODO_CATEGORY, entity);
}

export function editTodoCategory(id) {
  const entity = todoCategoryStorage.get(id);

  validateByJSONSchema(entity, TODO_CATEGORY_STORAGE_SCHEMA);

  entity.isEditing = true;
  entity.numberOfTodos = todoStorage.where({ categoryId: entity.id }).get().length;

  appDispatcher.emit(types.UPDATE_TODO_CATEGORY, entity);
}

export function updateTodoCategory(id, name) {
  const entity = todoCategoryStorage.update(id, { name });

  validateByJSONSchema(entity, TODO_CATEGORY_STORAGE_SCHEMA);

  entity.isEditing = false;
  entity.numberOfTodos = todoStorage.where({ categoryId: entity.id }).get().length;

  getTodos();
  appDispatcher.emit(types.UPDATE_TODO_CATEGORY, entity);
}

export function deleteTodoCategory(id) {
  const todoCategory = todoCategoryStorage.get(id);
  const todoCategories = todoCategoryStorage.all();
  const categoryTodos = todoStorage.where({ categoryId: id }).get();

  // update other todo category id
  todoCategories.forEach(todoCategory_ => {
    if (todoCategory.order < todoCategory_.order) {
      todoCategoryStorage.update(todoCategory_.id, {
        order: todoCategory_.order - 1,
      });
    }
  });

  // remove todo belonged this category
  categoryTodos.forEach(categoryTodo => {
    todoStorage.destroy(categoryTodo.id);
  });

  todoCategoryStorage.destroy(id);

  getTodos();
  getTodoCategories();
}

export function sortTodoCategories(from, to) {
  const allTodoCategories = todoCategoryStorage.order('order').get();

  if (from < to) {
    // To move to down.
    for (let index = from; index <= to; index++) {
      const todoCategory = allTodoCategories[index];

      if (index === from) {
        todoCategoryStorage.update(todoCategory.id, { order: to });
      } else if (index <= to) {
        todoCategoryStorage.update(todoCategory.id, { order: todoCategory.order - 1 });
      }
    }
  } else if (to < from) {
    // To move to up.
    for (let index = to; index <= from; index++) {
      const todoCategory = allTodoCategories[index];

      if (index === from) {
        todoCategoryStorage.update(todoCategory.id, { order: to });
      } else if (index <= from) {
        todoCategoryStorage.update(todoCategory.id, { order: todoCategory.order + 1 });
      }
    }
  }

  getTodoCategories();
}
