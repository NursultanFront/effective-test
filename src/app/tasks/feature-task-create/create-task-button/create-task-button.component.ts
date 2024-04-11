import { TasksFacade } from '../../store';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tap } from 'rxjs';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { Task } from '../../model/tasks.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-create-task-button',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule],
  templateUrl: './create-task-button.component.html',
  styleUrls: ['./create-task-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskButtonComponent {
  private dialog = inject(MatDialog);
  private tasksFacade = inject(TasksFacade);
  private destroyRef = inject(DestroyRef);

  public openDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((createdTask: Task) => {
          if (createdTask) {
            console.log(createdTask);
            this.tasksFacade.createTask(createdTask);
          }
        })
      )
      .subscribe();
  }
}
