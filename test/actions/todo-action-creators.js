import assert from 'power-assert';

import {
  getTasks,
  createTask,
  completeTask,
  editTask,
  updateTask,
  deleteTask,
  sortTasks,
} from '../../src/scripts/actions/task-action-creators';
import taskResource from '../../src/scripts/resources/task-resource';
import taskCategoryResource from '../../src/scripts/resources/task-category-resource';
import appDispatcher from '../../src/scripts/dispatchers/app-dispatcher';
import { actionTypes as types, initialTaskCategoryNames } from '../../src/scripts/constants/constants';


describe('TaskActionCreators', () => {
  let taskCategoryId;

  beforeEach(() => {
    taskResource.drop();
    taskCategoryResource.drop();
    taskCategoryResource.init();
    taskCategoryId = taskCategoryResource.all()[0].id;
    appDispatcher._listeners = {};
  });

  describe('getTasks', () => {
    it('get all tasks', (done) => {
      appDispatcher.on(types.GET_ALL_TASKS, (tasks) => {
        assert(tasks[0].categoryName === initialTaskCategoryNames.TODAY);
        assert(tasks[1].categoryName === initialTaskCategoryNames.LATER);
        assert(tasks[2].categoryName === initialTaskCategoryNames.SCHEDULE);
        done();
      });
      getTasks();
    });
  });

  describe('createTask', () => {
    it('an item', (done) => {
      appDispatcher.on(types.CREATE_TASK, (task) => {
        assert(task.id !== undefined);
        assert(task.text === 'Hello World');
        assert(task.completed === false);
        done();
      });
      createTask('Hello World', taskCategoryId);
    });
  });

  describe('editTask', () => {
    it('an item', (done) => {
      appDispatcher.on(types.UPDATE_TASK, (id) => {
        assert(id !== undefined);
        done();
      });
      createTask('Hello World', taskCategoryId);

      const tasks = taskResource.all();
      const task_ = tasks[0];

      editTask(task_.id);
    });
  });

  describe('updateTask', () => {
    it('an item', (done) => {
      appDispatcher.on(types.UPDATE_TASK, (task) => {
        assert(task.id !== undefined);
        assert(task.text === 'Hello New World');
        assert(task.completed === false);
        done();
      });
      createTask('Hello World', taskCategoryId);

      const tasks = taskResource.all();
      const task_ = tasks[0];

      updateTask(task_.id, 'Hello New World');
    });
  });

  describe('completeTask', () => {
    it('an item', (done) => {
      appDispatcher.on(types.UPDATE_TASK, (task) => {
        assert(task.id !== undefined);
        assert(task.text === 'Hello World');
        assert(task.completed === true);
        done();
      });
      createTask('Hello World', taskCategoryId);

      const tasks = taskResource.all();
      const task_ = tasks[0];

      completeTask(task_.id);
    });
  });

  describe('deleteTask', () => {
    it('an item', (done) => {
      appDispatcher.on(types.GET_ALL_TASKS, (tasks_) => {
        // num of task categories is 3
        assert(tasks_[0].tasks.length === 0);
        assert(tasks_[1].tasks.length === 0);
        assert(tasks_[2].tasks.length === 0);
        done();
      });
      createTask('Hello World', taskCategoryId);

      const tasks = taskResource.all();
      const task_ = tasks[0];

      deleteTask(task_.categoryId, task_.id);
    });
  });

  describe('sortTasks', () => {
    it('from < to', (done) => {
      appDispatcher.on(types.GET_ALL_TASKS, (tasks) => {
        assert(tasks[0].tasks.length === 3);
        assert(tasks[0].tasks[0].text === 'Hello World 1');
        assert(tasks[0].tasks[1].text === 'Hello World 0');
        done();
      });
      createTask('Hello World 0', taskCategoryId);
      createTask('Hello World 1', taskCategoryId);
      createTask('Hello World 2', taskCategoryId);
      sortTasks(taskCategoryId, 0, 1);
    });
    it('to < from', (done) => {
      appDispatcher.on(types.GET_ALL_TASKS, (tasks) => {
        assert(tasks[0].tasks.length === 3);
        assert(tasks[0].tasks[0].text === 'Hello World 1');
        assert(tasks[0].tasks[1].text === 'Hello World 0');
        done();
      });
      createTask('Hello World 0', taskCategoryId);
      createTask('Hello World 1', taskCategoryId);
      createTask('Hello World 2', taskCategoryId);
      sortTasks(taskCategoryId, 1, 0);
    });
  });
});
