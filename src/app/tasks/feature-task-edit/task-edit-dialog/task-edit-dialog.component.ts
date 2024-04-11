import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskStatus } from '../../model/tasks.enum';

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss'],
  standalone: true,
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
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class TaskEditDialogComponent {
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<TaskEditDialogComponent>);
  public statuses = Object.values(TaskStatus).filter(
    (status) => status !== TaskStatus.All
  );

  public formGroup = new FormBuilder().group({
    assignees: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    status: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor() {
    if (this.data) {
      console.log(this.data);

      this.formGroup.patchValue({
        assignees: this.data.assignees,
        status: this.data.status,
      });
    }
  }

  public onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }
}
