"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Serpent on 09.03.2017.
 */
var router_1 = require("@angular/router");
var index_1 = require("./login/index");
var index_2 = require("./register/index");
var index_3 = require("./dashboard/index");
var auth_guard_1 = require("./_guards/auth.guard");
var index_4 = require("./projects/index");
var tasks_component_1 = require("./tasks/tasks.component");
var newtask_component_1 = require("./new_task/newtask.component");
var taskslist_component_1 = require("./tasks_list/taskslist.component");
var developers_component_1 = require("./developers/developers.component");
var statistics_component_1 = require("./statistics/statistics.component");
var restore_component_1 = require("./restore/restore.component");
var newpass_component_1 = require("./new_pass/newpass.component");
var projects_list_component_1 = require("./projects_list/projects_list.component");
var new_projects_component_1 = require("./new_project/new_projects.component");
var my_tasks_component_1 = require("./my_tasks/my_tasks.component");
var my_projects_component_1 = require("./my_projects/my_projects.component");
var edit_task_component_1 = require("./edit_task/edit_task.component");
var edit_project_component_1 = require("./edit_project/edit_project.component");
var appRoutes = [
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_2.RegisterComponent },
    { path: '', component: index_3.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'project', component: index_4.ProjectsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'task', component: tasks_component_1.TasksComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'new_task', component: newtask_component_1.NewTaskComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'tasks_list', component: taskslist_component_1.TasksListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'my_tasks', component: my_tasks_component_1.MyTasksComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'my_projects', component: my_projects_component_1.MyProjectsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'projects_list', component: projects_list_component_1.ProjectsListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'new_project', component: new_projects_component_1.NewProjectComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'developer', component: developers_component_1.DevelopersComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'statistics', component: statistics_component_1.StatisticsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'edit_task', component: edit_task_component_1.EditTaskComponent },
    { path: 'edit_project', component: edit_project_component_1.EditProjectComponent },
    { path: 'newpass', component: newpass_component_1.NewPasswordComponent },
    { path: 'restore', component: restore_component_1.RestoreComponent },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map