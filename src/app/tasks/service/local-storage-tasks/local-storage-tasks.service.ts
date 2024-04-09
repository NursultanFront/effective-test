import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { Injectable, inject } from '@angular/core';
import { Task } from '../../model/tasks.interface';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageTasksService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly taskUrl = 'tasks';

  private taskNullError(): Observable<never> {
    return throwError(() => new Error('No tasks found in localStorage'));
  }

  public getTask() {
    const tasksArray =
      this.localStorageService.getItem<Task[]>(this.taskUrl) ?? [];

    return of(tasksArray);
  }

  public editTask(editedTask: Task) {
    const tasksArray = this.localStorageService.getItem<Task[]>(this.taskUrl);

    if (!tasksArray) {
      return this.taskNullError();
    }

    const newTaskArray = tasksArray.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );

    this.localStorageService.setItem<Task[]>(this.taskUrl, newTaskArray);

    return of(editedTask);
  }

  public addNewTask(newTask: Task) {
    const tasksArray =
      this.localStorageService.getItem<Task[]>(this.taskUrl) ?? [];

    const newTaskArray = [...tasksArray, newTask];

    this.localStorageService.setItem<Task[]>(this.taskUrl, newTaskArray);

    return of(newTask);
  }

  public deleteTask(deletedTaskId: number) {
    const tasksArray = this.localStorageService.getItem<Task[]>(this.taskUrl);

    if (!tasksArray) {
      return this.taskNullError();
    }

    const filteredTasks = tasksArray.filter(
      (task) => task.id !== deletedTaskId
    );

    this.localStorageService.setItem<Task[]>(this.taskUrl, filteredTasks);

    return of(deletedTaskId);
  }
}
