import { EntityState } from '@ngrx/entity';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Task, TaskFilter } from '../model/tasks.interface';
import * as tasksActions from './tasks.actions';

export const tasksFeatureKey = 'tasks';
export interface State extends EntityState<Task> {
  filter: TaskFilter;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({});

export const initialState: State = adapter.getInitialState({
  filter: {
    assignee: '',
    date: null,
    status: 'Все',
  },
});

export const reducer = createReducer(
  initialState,
  on(tasksActions.loadTasksSuccess, (state, { tasks }) =>
    adapter.setAll(tasks, { ...state })
  ),
  on(tasksActions.loadTasksFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(tasksActions.createTaskSuccess, (state, { task }) =>
    adapter.addOne({ ...task }, { ...state })
  ),
  on(tasksActions.createTaskFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(tasksActions.deleteTaskSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state })
  ),
  on(tasksActions.deleteTaskFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(tasksActions.editTaskSuccess, (state, { changes, id }) =>
    adapter.updateOne(
      {
        changes,
        id,
      },
      state
    )
  ),
  on(tasksActions.deleteTaskFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(tasksActions.filterTasks, (state, { filter }) => ({
    ...state,
    filter,
  }))
);
export const tasksFeature = createFeature({
  name: tasksFeatureKey,
  reducer,
});
