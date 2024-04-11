import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTasks from './tasks.reducer';
import { selectRouteParams } from 'src/app/core/router/router.selector';

export const selectTasksState = createFeatureSelector<fromTasks.State>(
  fromTasks.tasksFeatureKey
);
const { selectAll, selectEntities } = fromTasks.adapter.getSelectors();

export const selectAllTasks = createSelector(
  selectTasksState,
  (state: fromTasks.State) => selectAll(state)
);

export const selectTaskEntities = createSelector(
  selectTasksState,
  (state: fromTasks.State) => selectEntities(state)
);

export const selectOpenedTask = createSelector(
  selectRouteParams,
  selectTaskEntities,
  ({ id }, entities) => entities[id] || null
);

export const selectUniqueAssignees = createSelector(selectAllTasks, (tasks) => {
  const allAssignees = tasks.map((task) => task.assignees).flat();
  const uniqueAssignees = [...new Set(allAssignees)];
  return uniqueAssignees;
});
