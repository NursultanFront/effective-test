import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../model/tasks.interface';
import { CreateTaskButtonComponent } from '../../feature-task-create/create-task-button/create-task-button.component';
import { TasksCardComponent } from '../tasks-card/tasks-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  imports: [CommonModule, CreateTaskButtonComponent, TasksCardComponent],
  standalone: true,
})
export class TasksListComponent {
  @Input({ required: true })
  tasks!: Task[];
  @Output()
  deleteTask = new EventEmitter<number>();
  @Output()
  openTaskPage = new EventEmitter<number>();
  public onDeleteTask(id: number) {
    this.deleteTask.emit(id);
  }
  public onOpenTask(id: number): void {
    this.openTaskPage.emit(id);
  }
}
