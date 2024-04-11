import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../model/tasks.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TaskEditButtonComponent } from '../../feature-task-edit/task-edit-button/task-edit-button.component';

@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TaskEditButtonComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCardComponent {
  @Input({ required: true })
  task!: Task;

  @Output()
  onDeleteTask = new EventEmitter<void>();
  @Output()
  onOpenTask = new EventEmitter<void>();

  public deleteTask() {
    this.onDeleteTask.emit();
  }

  public openTask() {
    this.onOpenTask.emit();
  }
}
