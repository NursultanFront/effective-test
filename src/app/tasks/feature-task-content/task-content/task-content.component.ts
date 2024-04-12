import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TasksFacade } from '../../store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.scss'],
  standalone: true,
  imports: [
    PushPipe,
    LetDirective,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskContentComponent {
  private readonly tasksFacade = inject(TasksFacade);
  public readonly task$ = this.tasksFacade.openedTask$;
  private readonly router = inject(Router);

  public backToMainPage() {
    this.router.navigate(['/']);
  }
}
