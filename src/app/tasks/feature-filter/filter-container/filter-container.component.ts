import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskStatus } from '../../model/tasks.enum';
import { TasksFacade } from '../../store';
import { combineLatest, startWith, debounceTime, tap } from 'rxjs';
import { TaskStatusValue } from '../../model/tasks.interface';
@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterContainerComponent implements OnInit {
  public statuses = Object.values(TaskStatus);
  private readonly tasksFacade = inject(TasksFacade);
  public readonly assignee$ = this.tasksFacade.assignee$;

  public statusControl = new FormControl<TaskStatusValue>('Все');
  public assigneeControl = new FormControl<string>('');
  public deadlineControl = new FormControl<Date | null>(null);

  ngOnInit(): void {
    combineLatest([
      this.statusControl.valueChanges.pipe(startWith(this.statusControl.value)),
      this.assigneeControl.valueChanges.pipe(
        startWith(this.assigneeControl.value)
      ),
      this.deadlineControl.valueChanges.pipe(
        startWith(this.deadlineControl.value)
      ),
    ])
      .pipe(
        tap(([status, assignee, deadline]) => {
          this.tasksFacade.filterTasks({
            status: status as TaskStatusValue,
            assignee: assignee as string,
            date: deadline,
          });
        })
      )
      .subscribe(() => {});
  }
}
