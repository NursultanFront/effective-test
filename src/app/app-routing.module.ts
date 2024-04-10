import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksContainerListComponent } from './tasks/feature-task-list/tasks-container-list/tasks-container-list.component';

export const routes: Routes = [
  {
    path: 'tasks-list',
    component: TasksContainerListComponent,
  },
  {
    path: '**',
    redirectTo: 'tasks-list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
