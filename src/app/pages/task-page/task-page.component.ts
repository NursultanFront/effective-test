import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TasksFacade } from 'src/app/tasks/store';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class TaskPageComponent {
  private readonly tasksFacade = inject(TasksFacade);
  constructor() {
    this.tasksFacade.loadTasks();
  }
}
