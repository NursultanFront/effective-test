import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { TasksFacade } from '../../store';
import { Router } from '@angular/router';
import { TasksListComponent } from '../tasks-list/tasks-list.component';
import { LetDirective } from '@ngrx/component';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-tasks-container-list',
  templateUrl: './tasks-container-list.component.html',
  styleUrls: ['./tasks-container-list.component.scss'],
  imports: [TasksListComponent, LetDirective, MatNativeDateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TasksContainerListComponent implements OnInit {
  private readonly tasksFacade = inject(TasksFacade);
  public tasks$ = this.tasksFacade.tasks$;
  private router = inject(Router);

  ngOnInit(): void {
    this.tasksFacade.loadTasks();
  }

  public onDeleteTask(id: number): void {
    console.log(id);
    this.tasksFacade.deleteTask(id);
  }

  public openTaskPage(id: number) {
    this.router.navigate(['tasks-list/task', id]);
  }
}
