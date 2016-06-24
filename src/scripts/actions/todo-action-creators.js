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
      order: todoCategory.order,
      isEditing: false,
      todos: todoStorage.where({ categoryId: todoCategory.id }).order('order').get(),
    });
  });

  validateByJSONSchema(todos, TODOS_STORAGE_SCHEMA);

  for (let todoCategoryIndex = 0; todoCategoryIndex < todos.length; todoCategoryIndex++) {
    const todoCategory = todos[todoCategoryIndex];

    for (let todoIndex = 0; todoIndex < todoCategory.todos.length; todoIndex++) {
      const todo = todoCategory.todos[todoIndex];

      todo.isEditing = false;
    }
  }

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

  appDispatcher.emit(types.UPDATE_TODO, entity);
}

export function editTodo(id) {
  const entity = todoStorage.get(id);

  validateByJSONSchema(entity, TODO_STORAGE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TODO, entity);
}

export function editNextTodo(categoryId, currentOrder) {
  const entity = todoStorage.where({ categoryId }).where({ order: currentOrder + 1 }).first();
  if (entity == null) {
    return true;
  }

  validateByJSONSchema(entity, TODO_STORAGE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TODO, entity);
}

export function editPrevTodo(categoryId, currentOrder) {
  const entity = todoStorage.where({ categoryId }).where({ order: currentOrder - 1 }).first();
  if (entity == null) {
    return true;
  }

  validateByJSONSchema(entity, TODO_STORAGE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TODO, entity);
}

export function updateTodo(id, text) {
  const entity = todoStorage.update(id, { text });

  validateByJSONSchema(entity, TODO_STORAGE_SCHEMA);

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TODO, entity);
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
  const currentTodo = todoStorage
                        .where({ categoryId: currentCategoryId })
                        .where({ order: from })
                        .first();

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

  const currentCategoryTodos = todoStorage
                                 .where({ categoryId: currentCategoryId })
                                 .order('order')
                                 .get();

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

export function editTodoCategory(id) {
  const entity = todoCategoryStorage.get(id);

  entity.isEditing = true;

  appDispatcher.emit(types.EDIT_TODO_CATEGORY, entity);
}

export function updateTodoCategory(id, name) {
  const entity = todoCategoryStorage.update(id, { name });

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TODO_CATEGORY, entity);
}

export function createTodoCategory(name) {
  const order = todoCategoryStorage.all().length;
  const entity = todoCategoryStorage.create({
    name,
    order,
  });

  entity.isEditing = true;

  appDispatcher.emit(types.CREATE_TODO_CATEGORY, entity);
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

  getTodos();
}
