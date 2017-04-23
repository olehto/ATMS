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
var appRoutes = [
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_2.RegisterComponent },
    { path: '', component: index_3.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'project', component: index_4.ProjectsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'task', component: tasks_component_1.TasksComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'projects/new_task', component: newtask_component_1.NewTaskComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'tasks_list', component: taskslist_component_1.TasksListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'developer', component: developers_component_1.DevelopersComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'statistics', component: statistics_component_1.StatisticsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'newpass', component: newpass_component_1.NewPasswordComponent },
    { path: 'restore', component: restore_component_1.RestoreComponent },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map