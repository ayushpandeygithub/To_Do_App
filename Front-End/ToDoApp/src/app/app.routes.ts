import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ActiveTaskComponent } from './components/active tasks/active-task/active-task.component';
import { CompletedTaskComponent } from './components/completed task/completed-task/completed-task.component';
import { AddTaskModalComponent } from './components/add task/add-task-modal/add-task-modal.component';
import { AppStartupComponent } from './components/startup/app-startup/app-startup.component';
import { SignInComponent } from './components/user authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/user authentication/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
export const routes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'startup',
    component: AppStartupComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'active-task',
        component: ActiveTaskComponent,
      },
      {
        path: 'completed-task',
        component: CompletedTaskComponent,
      },
      {
        path: 'add-task',
        component: AddTaskModalComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  
];
