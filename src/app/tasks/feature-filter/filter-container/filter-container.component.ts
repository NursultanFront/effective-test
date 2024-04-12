import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
import { TaskFilter, TaskStatusValue } from '../../model/tasks.interface';
import { combineLatest, distinctUntilChanged, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  public readonly statuses = Object.values(TaskStatus);
  private readonly tasksFacade = inject(TasksFacade);
  public readonly assignee$ = this.tasksFacade.assignee$;
  private destroyRef = inject(DestroyRef);

  private readonly filterValues: TaskFilter = {
    status: 'Все',
    assignee: '',
    date: null,
  };

  public statusControl = new FormControl<TaskStatusValue>('Все');
  public assigneeControl = new FormControl<string>('');
  public deadlineControl = new FormControl<Date | null>(null);

  ngOnInit(): void {
    combineLatest([
      this.statusControl.valueChanges.pipe(
        startWith(this.statusControl.value),
        distinctUntilChanged()
      ),
      this.assigneeControl.valueChanges.pipe(
        startWith(this.assigneeControl.value),
        distinctUntilChanged()
      ),
      this.deadlineControl.valueChanges.pipe(
        startWith(this.deadlineControl.value),
        distinctUntilChanged()
      ),
    ])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(([status, assignee, deadline]) => {
          const filter = {
            status: status ?? 'Все',
            assignee: assignee ?? '',
            date: deadline,
          };
          this.tasksFacade.filterTasks({ ...filter });
        })
      )
      .subscribe();
  }

  public resetFilters(): void {
    this.statusControl.setValue(this.filterValues.status);
    this.assigneeControl.setValue(this.filterValues.assignee);
    this.deadlineControl.setValue(this.filterValues.date);

    this.tasksFacade.filterTasks(this.filterValues);
  }
}
