import appDispatcher from '../dispatchers/app-dispatcher';
import taskResource from '../resources/task-resource';
import taskCategoryResource from '../resources/task-category-resource';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema';
import { TASK_RESOURCE_SCHEMA, TASKS_RESOURCE_SCHEMA } from '../json-schemas/task-resource';


export function getTasks() {
  const tasks = [];

  const allTaskCategories = taskCategoryResource.order('order').get();

  allTaskCategories.forEach(taskCategory => {
    tasks.push({
      categoryName: taskCategory.name,
      categoryId: taskCategory.id,
      order: taskCategory.order,
      isEditing: false,
      tasks: taskResource.where({ categoryId: taskCategory.id }).order('order').get(),
    });
  });

  validateByJSONSchema(tasks, TASKS_RESOURCE_SCHEMA);

  for (let taskCategoryIndex = 0; taskCategoryIndex < tasks.length; taskCategoryIndex++) {
    const taskCategory = tasks[taskCategoryIndex];

    for (let taskIndex = 0; taskIndex < taskCategory.tasks.length; taskIndex++) {
      const task = taskCategory.tasks[taskIndex];

      task.isEditing = false;
    }
  }

  appDispatcher.emit(types.GET_ALL_TASKS, tasks);
}

export function createTask(text, categoryId) {
  const tasks = taskResource.where({ categoryId }).get();

  const entity = taskResource.create({
    text,
    categoryId,
    order: tasks.length,
  });

  validateByJSONSchema(entity, TASK_RESOURCE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.CREATE_TASK, entity);
}

export function completeTask(id) {
  const task = taskResource.get(id);
  const entity = taskResource.update(task.id, {
    completed: !task.completed,
  });

  validateByJSONSchema(entity, TASK_RESOURCE_SCHEMA);

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function editTask(id) {
  const entity = taskResource.get(id);

  validateByJSONSchema(entity, TASK_RESOURCE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function editNextTask(categoryId, currentOrder) {
  const entity = taskResource.where({ categoryId }).where({ order: currentOrder + 1 }).first();
  if (entity == null) {
    return;
  }

  validateByJSONSchema(entity, TASK_RESOURCE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function editPrevTask(categoryId, currentOrder) {
  const entity = taskResource.where({ categoryId }).where({ order: currentOrder - 1 }).first();
  if (entity == null) {
    return;
  }

  validateByJSONSchema(entity, TASK_RESOURCE_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function updateTask(id, text) {
  const entity = taskResource.update(id, { text });

  validateByJSONSchema(entity, TASK_RESOURCE_SCHEMA);

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function deleteTask(categoryId, taskId) {
  const task = taskResource.get(taskId);
  const categoryTasks = taskResource.where({ categoryId }).order('order').get();

  categoryTasks.forEach(categoryTask => {
    if (task.order < categoryTask.order) {
      taskResource.update(categoryTask.id, {
        order: categoryTask.order - 1,
      });
    }
  });

  taskResource.destroy(taskId);

  getTasks();
}

export function sortTasks(categoryId, from, to) {
  const tasks = taskResource.where({ categoryId }).order('order').get();

  if (from < to) {
    // To move to down.
    for (let index = from; index <= to; index++) {
      const task = tasks[index];

      if (index === from) {
        taskResource.update(task.id, { order: to });
      } else if (index <= to) {
        taskResource.update(task.id, { order: task.order - 1 });
      }
    }
  } else if (to < from) {
    // To move to up.
    for (let index = to; index <= from; index++) {
      const task = tasks[index];

      if (index === from) {
        taskResource.update(task.id, { order: to });
      } else if (index <= from) {
        taskResource.update(task.id, { order: task.order + 1 });
      }
    }
  }

  getTasks();
}

export function moveTask(currentCategoryId, from, newCategoryId, to) {
  const currentTask = taskResource
                        .where({ categoryId: currentCategoryId })
                        .where({ order: from })
                        .first();

  const newCategoryTasks = taskResource.where({ categoryId: newCategoryId }).order('order').get();

  newCategoryTasks.forEach(newCategoryTask => {
    const order = newCategoryTask.order;

    if (order >= to) {
      taskResource.update(newCategoryTask.id, {
        order: newCategoryTask.order + 1,
      });
    }
  });

  taskResource.update(currentTask.id, {
    order: to,
    categoryId: newCategoryId,
  });

  const currentCategoryTasks = taskResource
                                 .where({ categoryId: currentCategoryId })
                                 .order('order')
                                 .get();

  currentCategoryTasks.forEach(currentCategoryTask => {
    const order = currentCategoryTask.order;

    if (order >= from) {
      taskResource.update(currentCategoryTask.id, {
        order: currentCategoryTask.order - 1,
      });
    }
  });

  getTasks();
}

export function editTaskCategory(id) {
  const entity = taskCategoryResource.get(id);

  entity.isEditing = true;

  appDispatcher.emit(types.EDIT_TASK_CATEGORY, entity);
}

export function updateTaskCategory(id, name) {
  const entity = taskCategoryResource.update(id, { name });

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TASK_CATEGORY, entity);
}

export function createTaskCategory(name) {
  const order = taskCategoryResource.all().length;
  const entity = taskCategoryResource.create({
    name,
    order,
  });

  entity.isEditing = true;

  appDispatcher.emit(types.CREATE_TASK_CATEGORY, entity);
}

export function deleteTaskCategory(id) {
  const taskCategory = taskCategoryResource.get(id);
  const taskCategories = taskCategoryResource.all();
  const categoryTasks = taskResource.where({ categoryId: id }).get();

  // update other task category id
  taskCategories.forEach(taskCategory_ => {
    if (taskCategory.order < taskCategory_.order) {
      taskCategoryResource.update(taskCategory_.id, {
        order: taskCategory_.order - 1,
      });
    }
  });

  // remove task belonged this category
  categoryTasks.forEach(categoryTask => {
    taskResource.destroy(categoryTask.id);
  });

  taskCategoryResource.destroy(id);

  getTasks();
}

export function sortTaskCategories(from, to) {
  const allTaskCategories = taskCategoryResource.order('order').get();

  if (from < to) {
    // To move to down.
    for (let index = from; index <= to; index++) {
      const taskCategory = allTaskCategories[index];

      if (index === from) {
        taskCategoryResource.update(taskCategory.id, { order: to });
      } else if (index <= to) {
        taskCategoryResource.update(taskCategory.id, { order: taskCategory.order - 1 });
      }
    }
  } else if (to < from) {
    // To move to up.
    for (let index = to; index <= from; index++) {
      const taskCategory = allTaskCategories[index];

      if (index === from) {
        taskCategoryResource.update(taskCategory.id, { order: to });
      } else if (index <= from) {
        taskCategoryResource.update(taskCategory.id, { order: taskCategory.order + 1 });
      }
    }
  }

  getTasks();
}
