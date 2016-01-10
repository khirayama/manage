import appDispatcher from '../dispatchers/app-dispatcher';
import todoStorage from '../storages/todo-storage';
import todoCategoryStorage from '../storages/todo-category-storage';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema';
import { TODO_STORAGE_SCHEMA, TODOS_STORAGE_SCHEMA } from '../json-schemas/todo-storage';


export function getTodos() {
  const todos = [];

  const allTodoCategories = todoCategoryStorage.order('order').get();

  allTodoCategories.forEach(todoCategory => {
    todos.push({
      categoryName: todoCategory.name,
      categoryId: todoCategory.id,
      todos: todoStorage.where({ categoryId: todoCategory.id }).order('order').get(),
    });
  });

  validateByJSONSchema(todos, TODOS_STORAGE_SCHEMA);

  todos.forEach(todoCategory => {
    todoCategory.todos.forEach(todo => {
      todo.isEditing = false;
    });
  });

  appDispatcher.emit(types.GET_ALL_TODOS, todos);
}

export function createTodo(text, categoryId) {
  const todos = todoStorage.where({ categoryId }).get();

  const entity = todoStorage.create({
    text,
    categoryId,
    order: todos.length,
  });

  validateByJSONSchema(entity, TODO_STORAGE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.CREATE_TODO, entity);
}

export function completeTodo(id) {
  const todo = todoStorage.get(id);
  const entity = todoStorage.update(todo.id, {
    completed: !todo.completed,
  });

  validateByJSONSchema(entity, TODO_STORAGE_SCHEMA);

  entity.isEditing = false;

  appDispatcher.emit(types.COMPLETE_TODO, entity);
}

export function editTodo(categoryId, order) {
  const todos = todoStorage.where({ categoryId }).get();
  const len = todos.length;
  let entity;

  if (len - 1 < order) {
    entity = todoStorage.where({ categoryId }).where({ order: 0 }).get()[0];
  } else if (order < 0) {
    entity = todoStorage.where({ categoryId }).where({ order: len - 1 }).get()[0];
  } else {
    entity = todoStorage.where({ categoryId }).where({ order }).get()[0];
  }

  validateByJSONSchema(entity, TODO_STORAGE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.EDIT_TODO, entity);
}

export function updateTodo(id, text) {
  const entity = todoStorage.update(id, { text });

  validateByJSONSchema(entity, TODO_STORAGE_SCHEMA);

  entity.isEditing = false;

  appDispatcher.emit(types.EDIT_TODO, entity);
}

export function deleteTodo(categoryId, todoId) {
  const todo = todoStorage.get(todoId);
  const categoryTodos = todoStorage.where({ categoryId }).order('order').get();

  categoryTodos.forEach(categoryTodo => {
    if (todo.order < categoryTodo.order) {
      todoStorage.update(categoryTodo.id, {
        order: categoryTodo.order - 1,
      });
    }
  });

  todoStorage.destroy(todoId);

  getTodos();
}

export function sortTodos(categoryId, from, to) {
  const todos = todoStorage.where({ categoryId }).order('order').get();

  if (from < to) {
    // To move to down.
    for (let index = from; index <= to; index++) {
      const todo = todos[index];

      if (index === from) {
        todoStorage.update(todo.id, { order: to });
      } else if (index <= to) {
        todoStorage.update(todo.id, { order: todo.order - 1 });
      }
    }
  } else if (to < from) {
    // To move to up.
    for (let index = to; index <= from; index++) {
      const todo = todos[index];

      if (index === from) {
        todoStorage.update(todo.id, { order: to });
      } else if (index <= from) {
        todoStorage.update(todo.id, { order: todo.order + 1 });
      }
    }
  }

  getTodos();
}

export function moveTodo(currentCategoryId, from, newCategoryId, to) {
  const currentTodo = todoStorage.where({ categoryId: currentCategoryId }).where({ order: from }).get()[0];

  const newCategoryTodos = todoStorage.where({ categoryId: newCategoryId }).order('order').get();

  newCategoryTodos.forEach(newCategoryTodo => {
    const order = newCategoryTodo.order;

    if (order >= to) {
      todoStorage.update(newCategoryTodo.id, {
        order: newCategoryTodo.order + 1,
      });
    }
  });

  todoStorage.update(currentTodo.id, {
    order: to,
    categoryId: newCategoryId,
  });

  const currentCategoryTodos = todoStorage.where({ categoryId: currentCategoryId }).order('order').get();

  currentCategoryTodos.forEach(currentCategoryTodo => {
    const order = currentCategoryTodo.order;

    if (order >= from) {
      todoStorage.update(currentCategoryTodo.id, {
        order: currentCategoryTodo.order - 1,
      });
    }
  });

  getTodos();
}
