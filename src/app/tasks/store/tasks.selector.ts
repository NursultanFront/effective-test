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

// Селектор для доступа к фильтрам
export const selectTaskFilters = createSelector(
  selectTasksState,
  (state) => state.filter
);

// Селектор для отфильтрованных задач
export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectTaskFilters,
  (tasks, filters) => {
    return tasks.filter((task) => {
      const statusMatch =
        filters.status === 'Все' || task.status === filters.status;
      const assigneeMatch =
        !filters.assignee || task.assignees.includes(filters.assignee);
      const dateMatch =
        !filters.date ||
        new Date(task.deadline).toDateString() === filters.date.toDateString();

      return statusMatch && assigneeMatch && dateMatch;
    });
  }
);
