import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import * as tasksActions from './tasks.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Task } from '../model/tasks.interface';

@Injectable()
export class UsersEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.loadTasks),
      switchMap(() =>
        of(this.localStorageService.getItem<Task[]>('tasks') ?? []).pipe(
          map((tasks) => tasksActions.loadTasksSuccess({ tasks }))
        )
      )
    )
  );

  deleteTasks$ = createEffect(() =>
    this.actions$.pipe(ofType(tasksActions.deleteTask))
  );

  editTasks$ = createEffect(() =>
    this.actions$.pipe(ofType(tasksActions.editTask))
  );
  createTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.createTask)
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
