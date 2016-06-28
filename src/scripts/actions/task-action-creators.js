import appDispatcher from '../dispatchers/app-dispatcher';
import Task from '../resources/task';
import TaskCategory from '../resources/task-category';
import { actionTypes as types } from '../constants/constants';
import { validateByJSONSchema } from '../json-schemas/json-schema';
import { TASK_SCHEMA, TASKS_SCHEMA } from '../json-schemas/task';


export function getTasks() {
  const tasks = [];

  const allTaskCategories = TaskCategory.order('order').get();

  allTaskCategories.forEach(taskCategory => {
    tasks.push({
      categoryName: taskCategory.name,
      categoryId: taskCategory.id,
      order: taskCategory.order,
      isEditing: false,
      tasks: Task.where({ categoryId: taskCategory.id }).order('order').get(),
    });
  });

  validateByJSONSchema(tasks, TASKS_SCHEMA);

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
  const tasks = Task.where({ categoryId }).get();

  const entity = Task.create({
    text,
    categoryId,
    order: tasks.length,
  });

  validateByJSONSchema(entity, TASK_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.CREATE_TASK, entity);
}

export function completeTask(id) {
  const task = Task.get(id);
  const entity = Task.update(task.id, {
    completed: !task.completed,
  });

  validateByJSONSchema(entity, TASK_SCHEMA);

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function editTask(id) {
  const entity = Task.get(id);

  validateByJSONSchema(entity, TASK_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function editNextTask(categoryId, currentOrder) {
  const entity = Task.where({ categoryId }).where({ order: currentOrder + 1 }).first();
  if (entity === null) {
    return;
  }

  validateByJSONSchema(entity, TASK_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function editPrevTask(categoryId, currentOrder) {
  const entity = Task.where({ categoryId }).where({ order: currentOrder - 1 }).first();
  if (entity === null) {
    return;
  }

  validateByJSONSchema(entity, TASK_SCHEMA);

  entity.isEditing = true;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function updateTask(id, text) {
  const entity = Task.update(id, { text });

  validateByJSONSchema(entity, TASK_SCHEMA);

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TASK, entity);
}

export function deleteTask(categoryId, taskId) {
  const task = Task.get(taskId);
  const categoryTasks = Task.where({ categoryId }).order('order').get();

  categoryTasks.forEach(categoryTask => {
    if (task.order < categoryTask.order) {
      Task.update(categoryTask.id, {
        order: categoryTask.order - 1,
      });
    }
  });

  Task.destroy(taskId);

  getTasks();
}

export function sortTasks(categoryId, from, to) {
  const tasks = Task.where({ categoryId }).order('order').get();

  if (from < to) {
    // To move to down.
    for (let index = from; index <= to; index++) {
      const task = tasks[index];

      if (index === from) {
        Task.update(task.id, { order: to });
      } else if (index <= to) {
        Task.update(task.id, { order: task.order - 1 });
      }
    }
  } else if (to < from) {
    // To move to up.
    for (let index = to; index <= from; index++) {
      const task = tasks[index];

      if (index === from) {
        Task.update(task.id, { order: to });
      } else if (index <= from) {
        Task.update(task.id, { order: task.order + 1 });
      }
    }
  }

  getTasks();
}

export function moveTask(currentCategoryId, from, newCategoryId, to) {
  const currentTask = Task
                        .where({ categoryId: currentCategoryId })
                        .where({ order: from })
                        .first();

  const newCategoryTasks = Task.where({ categoryId: newCategoryId }).order('order').get();

  newCategoryTasks.forEach(newCategoryTask => {
    const order = newCategoryTask.order;

    if (order >= to) {
      Task.update(newCategoryTask.id, {
        order: newCategoryTask.order + 1,
      });
    }
  });

  Task.update(currentTask.id, {
    order: to,
    categoryId: newCategoryId,
  });

  const currentCategoryTasks = Task
                                 .where({ categoryId: currentCategoryId })
                                 .order('order')
                                 .get();

  currentCategoryTasks.forEach(currentCategoryTask => {
    const order = currentCategoryTask.order;

    if (order >= from) {
      Task.update(currentCategoryTask.id, {
        order: currentCategoryTask.order - 1,
      });
    }
  });

  getTasks();
}

export function editTaskCategory(id) {
  const entity = TaskCategory.get(id);

  entity.isEditing = true;

  appDispatcher.emit(types.EDIT_TASK_CATEGORY, entity);
}

export function updateTaskCategory(id, name) {
  const entity = TaskCategory.update(id, { name });

  entity.isEditing = false;

  appDispatcher.emit(types.UPDATE_TASK_CATEGORY, entity);
}

export function createTaskCategory(name) {
  const order = TaskCategory.all().length;
  const entity = TaskCategory.create({
    name,
    order,
  });

  entity.isEditing = true;

  appDispatcher.emit(types.CREATE_TASK_CATEGORY, entity);
}

export function deleteTaskCategory(id) {
  const taskCategory = TaskCategory.get(id);
  const taskCategories = TaskCategory.all();
  const categoryTasks = Task.where({ categoryId: id }).get();

  // update other task category id
  taskCategories.forEach(taskCategory_ => {
    if (taskCategory.order < taskCategory_.order) {
      TaskCategory.update(taskCategory_.id, {
        order: taskCategory_.order - 1,
      });
    }
  });

  // remove task belonged this category
  categoryTasks.forEach(categoryTask => {
    Task.destroy(categoryTask.id);
  });

  TaskCategory.destroy(id);

  getTasks();
}

export function sortTaskCategories(from, to) {
  const allTaskCategories = TaskCategory.order('order').get();

  if (from < to) {
    // To move to down.
    for (let index = from; index <= to; index++) {
      const taskCategory = allTaskCategories[index];

      if (index === from) {
        TaskCategory.update(taskCategory.id, { order: to });
      } else if (index <= to) {
        TaskCategory.update(taskCategory.id, { order: taskCategory.order - 1 });
      }
    }
  } else if (to < from) {
    // To move to up.
    for (let index = to; index <= from; index++) {
      const taskCategory = allTaskCategories[index];

      if (index === from) {
        TaskCategory.update(taskCategory.id, { order: to });
      } else if (index <= from) {
        TaskCategory.update(taskCategory.id, { order: taskCategory.order + 1 });
      }
    }
  }

  getTasks();
}
