import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as TasksSelectors from './tasks.selector';
import * as tasksActions from './tasks.actions';
import { Task, TaskFilter } from '../model/tasks.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  private readonly store = inject(Store);
  public readonly tasks$ = this.store.select(
    TasksSelectors.selectFilteredTasks
  );

  public readonly assignee$ = this.store.select(
    TasksSelectors.selectUniqueAssignees
  );

  public createTask(createdTask: Task): void {
    this.store.dispatch(tasksActions.createTask({ task: createdTask }));
  }

  public deleteTask(id: number): void {
    this.store.dispatch(tasksActions.deleteTask({ id }));
  }

  public loadTasks() {
    this.store.dispatch(tasksActions.loadTasks());
  }

  public filterTasks(filter: TaskFilter) {
    this.store.dispatch(tasksActions.filterTasks({ filter }));
  }
}
