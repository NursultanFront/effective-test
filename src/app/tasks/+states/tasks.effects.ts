import { LocalStorageTasksService } from './../service/local-storage-tasks/local-storage-tasks.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as tasksActions from './tasks.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Task } from '../model/tasks.interface';

@Injectable()
export class UsersEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.loadTasks),
      switchMap(() =>
        this.localStorageTasksService
          .getTask()
          .pipe(map((tasks) => tasksActions.loadTasksSuccess({ tasks })))
      )
    )
  );

  deleteTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.deleteTask),
      switchMap(({ id }) =>
        this.localStorageTasksService.deleteTask(id).pipe(
          map(() => tasksActions.deleteTaskSuccess({ id })),
          catchError((error) =>
            of(tasksActions.deleteTaskFailed({ error: error.message }))
          )
        )
      )
    )
  );

  editTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.editTask),
      switchMap(({ id, changes }) =>
        this.localStorageTasksService.editTask({ ...changes, id }).pipe(
          map((editedTask) =>
            tasksActions.editTaskSuccess({ id, changes: editedTask })
          ),
          catchError((error) =>
            of(tasksActions.editTaskFailed({ error: error.message }))
          )
        )
      )
    )
  );

  createTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.createTask),
      switchMap(({ task }) =>
        this.localStorageTasksService.addNewTask(task).pipe(
          map((task) => tasksActions.createTaskSuccess({ task })),
          catchError((error) =>
            of(tasksActions.createTaskFailed({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly localStorageTasksService: LocalStorageTasksService
  ) {}
}
