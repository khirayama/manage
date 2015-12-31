import appDispatcher from '../dispatchers/app-dispatcher';
import todoCategoryStorage from '../storages/todo-category-storage';
import todoStorage from '../storages/todo-storage';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema.js';
import todoCategoryStorageSchema from '../json-schemas/todo-category-storage.json';
import {
  getTodos,
} from './todo-action-creators';


export function getTodoCategories() {
  const allTodoCategories = todoCategoryStorage.order('order').get();

  allTodoCategories.forEach(todoCategory => {
    validateByJSONSchema(todoCategory, todoCategoryStorageSchema);

    todoCategory.isEditing = false;
  });

  appDispatcher.emit(types.GET_ALL_TODO_CATEGORIES, allTodoCategories);
}

export function createTodoCategory(name) {
  const order = todoCategoryStorage.all().length;
  const entity = todoCategoryStorage.create({
    name,
    order,
  });

  validateByJSONSchema(entity, todoCategoryStorageSchema);

  entity.isEditing = true;

  getTodos();
  appDispatcher.emit(types.CREATE_TODO_CATEGORY, entity);
}

export function editTodoCategory(order) {
  const todoCategories = todoCategoryStorage.all();
  const len = todoCategories.length;
  let entity;

  if (len - 1 < order) {
    entity = todoCategoryStorage.where({ order: 0 }).get()[0];
  } else if (order < 0) {
    entity = todoCategoryStorage.where({ order: len - 1 }).get()[0];
  } else {
    entity = todoCategoryStorage.where({ order }).get()[0];
  }

  entity.isEditing = true;

  validateByJSONSchema(entity, todoCategoryStorageSchema);

  appDispatcher.emit(types.EDIT_TODO_CATEGORY, entity);
}

export function updateTodoCategory(id, name) {
  const entity = todoCategoryStorage.update(id, { name });

  validateByJSONSchema(entity, todoCategoryStorageSchema);

  entity.isEditing = false;

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
  appDispatcher.emit(types.DELETE_TODO_CATEGORY, id);
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
