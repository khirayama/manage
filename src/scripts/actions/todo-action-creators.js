import appDispatcher from '../dispatchers/app-dispatcher';
import todoResource from '../resources/todo-resource';
import todoCategoryResource from '../resources/todo-category-resource';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema';
import { TODO_RESOURCE_SCHEMA, TODOS_RESOURCE_SCHEMA } from '../json-schemas/todo-resource';


export function getTodos() {
  const todos = [];

  const allTodoCategories = todoCategoryResource.order('order').get();

  allTodoCategories.forEach(todoCategory => {
    todos.push({
      categoryName: todoCategory.name,
      categoryId: todoCategory.id,
      order: todoCategory.order,
      isEditing: false,
      todos: todoResource.where({ categoryId: todoCategory.id }).order('order').get(),
    });
  });

  validateByJSONSchema(todos, TODOS_RESOURCE_SCHEMA);

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
  const todos = todoResource.where({ categoryId }).get();

  const entity = todoResource.create({
    text,
    categoryId,
    order: todos.length,
  });

  validateByJSONSchema(entity, TODO_RESOURCE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.CREATE_TODO, entity);
}

export function completeTodo(id) {
  const todo = todoResource.get(id);
  const entity = todoResource.update(todo.id, {
    completed: !todo.completed,
  });

  validateByJSONSchema(entity, TODO_RESOURCE_SCHEMA);

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TODO, entity);
}

export function editTodo(id) {
  const entity = todoResource.get(id);

  validateByJSONSchema(entity, TODO_RESOURCE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TODO, entity);
}

export function editNextTodo(categoryId, currentOrder) {
  const entity = todoResource.where({ categoryId }).where({ order: currentOrder + 1 }).first();
  if (entity == null) {
    return;
  }

  validateByJSONSchema(entity, TODO_RESOURCE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TODO, entity);
}

export function editPrevTodo(categoryId, currentOrder) {
  const entity = todoResource.where({ categoryId }).where({ order: currentOrder - 1 }).first();
  if (entity == null) {
    return;
  }

  validateByJSONSchema(entity, TODO_RESOURCE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TODO, entity);
}

export function updateTodo(id, text) {
  const entity = todoResource.update(id, { text });

  validateByJSONSchema(entity, TODO_RESOURCE_SCHEMA);

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TODO, entity);
}

export function deleteTodo(categoryId, todoId) {
  const todo = todoResource.get(todoId);
  const categoryTodos = todoResource.where({ categoryId }).order('order').get();

  categoryTodos.forEach(categoryTodo => {
    if (todo.order < categoryTodo.order) {
      todoResource.update(categoryTodo.id, {
        order: categoryTodo.order - 1,
      });
    }
  });

  todoResource.destroy(todoId);

  getTodos();
}

export function sortTodos(categoryId, from, to) {
  const todos = todoResource.where({ categoryId }).order('order').get();

  if (from < to) {
    // To move to down.
    for (let index = from; index <= to; index++) {
      const todo = todos[index];

      if (index === from) {
        todoResource.update(todo.id, { order: to });
      } else if (index <= to) {
        todoResource.update(todo.id, { order: todo.order - 1 });
      }
    }
  } else if (to < from) {
    // To move to up.
    for (let index = to; index <= from; index++) {
      const todo = todos[index];

      if (index === from) {
        todoResource.update(todo.id, { order: to });
      } else if (index <= from) {
        todoResource.update(todo.id, { order: todo.order + 1 });
      }
    }
  }

  getTodos();
}

export function moveTodo(currentCategoryId, from, newCategoryId, to) {
  const currentTodo = todoResource
                        .where({ categoryId: currentCategoryId })
                        .where({ order: from })
                        .first();

  const newCategoryTodos = todoResource.where({ categoryId: newCategoryId }).order('order').get();

  newCategoryTodos.forEach(newCategoryTodo => {
    const order = newCategoryTodo.order;

    if (order >= to) {
      todoResource.update(newCategoryTodo.id, {
        order: newCategoryTodo.order + 1,
      });
    }
  });

  todoResource.update(currentTodo.id, {
    order: to,
    categoryId: newCategoryId,
  });

  const currentCategoryTodos = todoResource
                                 .where({ categoryId: currentCategoryId })
                                 .order('order')
                                 .get();

  currentCategoryTodos.forEach(currentCategoryTodo => {
    const order = currentCategoryTodo.order;

    if (order >= from) {
      todoResource.update(currentCategoryTodo.id, {
        order: currentCategoryTodo.order - 1,
      });
    }
  });

  getTodos();
}

export function editTodoCategory(id) {
  const entity = todoCategoryResource.get(id);

  entity.isEditing = true;

  appDispatcher.emit(types.EDIT_TODO_CATEGORY, entity);
}

export function updateTodoCategory(id, name) {
  const entity = todoCategoryResource.update(id, { name });

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TODO_CATEGORY, entity);
}

export function createTodoCategory(name) {
  const order = todoCategoryResource.all().length;
  const entity = todoCategoryResource.create({
    name,
    order,
  });

  entity.isEditing = true;

  appDispatcher.emit(types.CREATE_TODO_CATEGORY, entity);
}

export function deleteTodoCategory(id) {
  const todoCategory = todoCategoryResource.get(id);
  const todoCategories = todoCategoryResource.all();
  const categoryTodos = todoResource.where({ categoryId: id }).get();

  // update other todo category id
  todoCategories.forEach(todoCategory_ => {
    if (todoCategory.order < todoCategory_.order) {
      todoCategoryResource.update(todoCategory_.id, {
        order: todoCategory_.order - 1,
      });
    }
  });

  // remove todo belonged this category
  categoryTodos.forEach(categoryTodo => {
    todoResource.destroy(categoryTodo.id);
  });

  todoCategoryResource.destroy(id);

  getTodos();
}

export function sortTodoCategories(from, to) {
  const allTodoCategories = todoCategoryResource.order('order').get();

  if (from < to) {
    // To move to down.
    for (let index = from; index <= to; index++) {
      const todoCategory = allTodoCategories[index];

      if (index === from) {
        todoCategoryResource.update(todoCategory.id, { order: to });
      } else if (index <= to) {
        todoCategoryResource.update(todoCategory.id, { order: todoCategory.order - 1 });
      }
    }
  } else if (to < from) {
    // To move to up.
    for (let index = to; index <= from; index++) {
      const todoCategory = allTodoCategories[index];

      if (index === from) {
        todoCategoryResource.update(todoCategory.id, { order: to });
      } else if (index <= from) {
        todoCategoryResource.update(todoCategory.id, { order: todoCategory.order + 1 });
      }
    }
  }

  getTodos();
}
