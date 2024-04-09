import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import * as TasksActions from './tasks.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Task } from '../model/tasks.interface';

@Injectable()
export class UsersEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() => {
        try {
          const tasks = this.localStorageService.getItem<Task[]>('tasks') ?? [];
          return of(TasksActions.loadTasksSuccess({ tasks }));
        } catch (error) {
          console.error('Error loading tasks:', error);
          return of(
            TasksActions.loadTasksFailed({ error: 'Failed to load tasks' })
          );
        }
      })
    )
  );

  deleteTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      map(({ id }) => {
        return TasksActions.deleteTaskSuccess({ id });
      }),
      catchError((error) => of(TasksActions.deleteTaskFailed({ error: error })))
    )
  );

  editTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.editTask)
      // switchMap(({ editedUser }) =>
      //   this.apiService
      //     .put<User>(
      //       `${AppRoutePathEnum.USERS}/${editedUser.id.toString()}`,
      //       editedUser
      //     )
      //     .pipe(
      //       map((editedUserResponse) =>
      //         usersActions.editingusersuccess({
      //           editedUser: editedUserResponse,
      //         })
      //       ),
      //       catchError((error: HttpErrorResponse) => {
      //         console.error('Error', error.message);
      //         return of(usersActions.editinguserfailure({ error }));
      //       })
      //     )
      // )
    )
  );
  createTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask)
      // switchMap(({ newUser }) =>
      //   this.apiService.post<User>(AppRoutePathEnum.USERS, newUser).pipe(
      //     map((newUserResponse) =>
      //       usersActions.createusersuccess({ newUser: newUserResponse })
      //     ),
      //     catchError((error: HttpErrorResponse) => {
      //       console.error('Error', error.message);
      //       return of(usersActions.createuserfailure({ error }));
      //     })
      //   )
      // )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly localStorageService: LocalStorageService
  ) {}
}
