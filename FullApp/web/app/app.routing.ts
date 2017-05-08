/**
 * Created by Serpent on 09.03.2017.
 */
import { Routes, RouterModule, Params} from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {DashboardComponent} from './dashboard/index';
import {AuthGuard} from "./_guards/auth.guard";
import {ProjectsComponent} from './projects/index';
import {TasksComponent} from "./tasks/tasks.component";
import {NewTaskComponent} from "./new_task/newtask.component";
import {TasksListComponent} from "./tasks_list/taskslist.component";
import {DevelopersComponent} from "./developers/developers.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {RestoreComponent} from "./restore/restore.component";
import {NewPasswordComponent} from "./new_pass/newpass.component";
import {ProjectsListComponent} from "./projects_list/projects_list.component";
import {NewProjectComponent} from "./new_project/new_projects.component";
import {MyTasksComponent} from "./my_tasks/my_tasks.component";
import {MyProjectsComponent} from "./my_projects/my_projects.component";
import {EditTaskComponent} from "./edit_task/edit_task.component";
import {EditProjectComponent} from "./edit_project/edit_project.component";

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent },
    {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'project', component: ProjectsComponent, canActivate: [AuthGuard]},
    {path: 'task', component: TasksComponent, canActivate: [AuthGuard] },
    {path: 'new_task', component: NewTaskComponent, canActivate: [AuthGuard] },
    {path: 'tasks_list', component: TasksListComponent, canActivate: [AuthGuard] },
    {path: 'my_tasks', component: MyTasksComponent, canActivate: [AuthGuard] },
    {path: 'my_projects', component: MyProjectsComponent, canActivate: [AuthGuard] },
    {path: 'projects_list', component: ProjectsListComponent, canActivate: [AuthGuard] },
    {path: 'new_project', component: NewProjectComponent, canActivate: [AuthGuard] },
    {path: 'developer', component:DevelopersComponent, canActivate: [AuthGuard] },
    {path: 'statistics', component:StatisticsComponent, canActivate: [AuthGuard] },
    {path: 'edit_task', component:EditTaskComponent},
    {path: 'edit_project', component:EditProjectComponent},
    {path: 'newpass', component:NewPasswordComponent},
    {path: 'restore', component:RestoreComponent},
    {path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);