import { createAction, props } from '@ngrx/store';
import { Task } from '../model/tasks.interface';

// Загрузка списка задач
export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailed = createAction(
  '[Task] Load Tasks Failed',
  props<{ error: string }>()
);

// Создание задачи
export const createTask = createAction(
  '[Task] Create Task',
  props<{ task: Task }>()
);
export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: Task }>()
);

export const createTaskFailed = createAction(
  '[Task] Create Task Success',
  props<{ error: string }>()
);

// Редактирование задачи
export const editTask = createAction(
  '[Task] Edit Task',
  props<{ id: number; changes: Task }>()
);

export const editTaskSuccess = createAction(
  '[Task] Edit Task Success',
  props<{ id: number; changes: Task }>()
);
export const editTaskFailed = createAction(
  '[Task] Edit Task Failed',
  props<{ error: string }>()
);

// Удаление задачи
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: number }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: number }>()
);

export const deleteTaskFailed = createAction(
  '[Task] Delete Task Failed',
  props<{ error: string }>()
);
