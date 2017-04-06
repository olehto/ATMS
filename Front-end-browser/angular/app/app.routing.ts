/**
 * Created by Serpent on 09.03.2017.
 */
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {DashboardComponent} from './dashboard/index';
import {ProjectsComponent} from './projects/index';
import {TasksComponent} from './tasks/index';
import {NewTaskComponent} from './new_task/index';
import {TasksListComponent} from './tasks_list/index';
import {DevelopersComponent} from './developers/index';
import {StatisticsComponent} from './statistics/index';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'tasks', component: TasksComponent},
    {path: 'projects/new_task', component: NewTaskComponent},
    {path: 'projects/tasks_list', component: TasksListComponent},
    {path: 'developers', component:DevelopersComponent},
    {path: 'statistics', component:StatisticsComponent},
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);