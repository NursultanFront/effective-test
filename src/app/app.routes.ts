import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksContainerListComponent } from './tasks/feature-task-list/tasks-container-list/tasks-container-list.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';

export const routes: Routes = [
  {
    path: 'tasks-list',
    component: TaskPageComponent,
    children: [
      {
        path: '',
        component: TasksContainerListComponent,
      },
      {
        path: 'task/:id',
        loadComponent: () =>
          import(
            './tasks/feature-task-content/task-content/task-content.component'
          ).then((c) => c.TaskContentComponent),
      },
    ],
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
