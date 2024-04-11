import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { Priority, TaskStatus } from '../../model/tasks.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskDialogComponent {
  private dialogRef = inject(MatDialogRef<CreateTaskDialogComponent>);

  public priorities = Object.values(Priority).filter(
    (status) => status !== Priority.All
  );
  public statuses = Object.values(TaskStatus).filter(
    (status) => status !== TaskStatus.All
  );

  public formGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    assignees: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  public onSubmit() {
    const newTask = {
      ...this.formGroup.value,
      id: Date.now(),
    };

    this.dialogRef.close(newTask);
  }
}
