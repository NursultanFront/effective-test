import { editTask } from './../../store/tasks.actions';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { take, tap } from 'rxjs';
import { TasksFacade } from '../../store';
import { TaskEditDialogComponent } from '../task-edit-dialog/task-edit-dialog.component';
import { Task } from '../../model/tasks.interface';

@Component({
  selector: 'app-task-edit-button',
  templateUrl: './task-edit-button.component.html',
  styleUrls: ['./task-edit-button.component.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
})
export class TaskEditButtonComponent {
  @Input({ required: true })
  data!: Task;
  private dialog = inject(MatDialog);
  private readonly taskFascade = inject(TasksFacade);
  openDialog() {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      data: {
        assignees: this.data.assignees,
        status: this.data.status,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        tap((editedData) => {
          if (editedData) {
            const editedTask = {
              ...this.data,
              ...editedData,
            };
            this.taskFascade.editTask(editedTask);
          }
        })
      )
      .subscribe();
  }
}
