import MicroStore from './micro-store';

import logger from '../utils/logger';
import appDispatcher from '../dispatchers/app-dispatcher';
import { actionTypes as types } from '../constants/constants';
import { parseTextToItem } from '../utils/text-to-schedule-parser';
import { validateByJSONSchema } from '../json-schemas/json-schema';
import { TASK_STORE_SCHEMA, TASKS_SCHEMA } from '../json-schemas/task-store';


export default class TaskStore extends MicroStore {
  constructor() {
    super();

    this._tasks = [];

    this.register(appDispatcher, types.GET_ALL_TASKS, tasks => {
      this.setTasks(tasks);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.CREATE_TASK, task => {
      this.create(task);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.UPDATE_TASK, task => {
      this.update(task);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.CREATE_TASK_CATEGORY, taskCategory => {
      this.addTaskCategory(taskCategory);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.EDIT_TASK_CATEGORY, taskCategory => {
      this.updateTaskCategory(taskCategory);
      this.dispatchChange();
    });
    this.register(appDispatcher, types.UPDATE_TASK_CATEGORY, taskCategory => {
      this.updateTaskCategory(taskCategory);
      this.dispatchChange();
    });
  }

  getTasks() {
    return this._tasks;
  }

  setTasks(tasks = []) {
    const newTasks = tasks.splice(0);

    newTasks.forEach(taskCategory => {
      taskCategory.tasks.forEach((task, index) => {
        const newTask = TaskStore._addSchedule(task);

        taskCategory.tasks.splice(index, 1, newTask);
      });
    });

    validateByJSONSchema(newTasks, TASKS_SCHEMA);
    TaskStore._checkOrder(newTasks);
    this._tasks = newTasks;
  }

  create(task) {
    const newTask = TaskStore._addSchedule(task);

    validateByJSONSchema(newTask, TASK_STORE_SCHEMA);
    this._tasks.forEach(taskCategory => {
      if (taskCategory.categoryId === task.categoryId) {
        taskCategory.tasks.push(newTask);
      }
    });
  }

  update(task) {
    const newTask = TaskStore._addSchedule(task);

    validateByJSONSchema(newTask, TASK_STORE_SCHEMA);
    this._tasks.forEach((taskCategory) => {
      if (taskCategory.categoryId === task.categoryId) {
        taskCategory.tasks.forEach((task_, index) => {
          if (task_.id === task.id) {
            taskCategory.tasks.splice(index, 1, newTask);
          }
        });
      }
    });
  }

  _transformTaskCategory(rawTaskCategory) {
    return {
      categoryId: rawTaskCategory.id,
      categoryName: rawTaskCategory.name,
      isEditing: rawTaskCategory.isEditing,
      tasks: [],
    };
  }

  addTaskCategory(taskCategory) {
    this._tasks.push(this._transformTaskCategory(taskCategory));
  }

  updateTaskCategory(taskCategory) {
    for (let taskIndex = 0; taskIndex < this._tasks.length; taskIndex++) {
      const taskCategory_ = this._tasks[taskIndex];
      if (taskCategory_.categoryId === taskCategory.id) {
        taskCategory_.categoryId = taskCategory.id;
        taskCategory_.categoryName = taskCategory.name;
        taskCategory_.isEditing = taskCategory.isEditing;
      }
    }
  }

  static _addSchedule(task) {
    const taskWithSchedule = parseTextToItem(task.text);
    const newTask = Object.assign({}, task, {
      scheduleText: taskWithSchedule.text,
      schedule: taskWithSchedule.schedule,
    });

    return newTask;
  }

  static _checkOrder(tasks) {
    tasks.forEach(taskCategory => {
      taskCategory.tasks.forEach((task, taskIndex) => {
        if (task.order !== taskIndex) {
          logger.error({ error: 'Wrong order.', item: task });
        }
      });
    });
  }
}
