"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Serpent on 09.03.2017.
 */
var router_1 = require("@angular/router");
var index_1 = require("./login/index");
var index_2 = require("./register/index");
var index_3 = require("./dashboard/index");
var index_4 = require("./projects/index");
var index_5 = require("./tasks/index");
var index_6 = require("./new_task/index");
var index_7 = require("./tasks_list/index");
var index_8 = require("./developers/index");
var index_9 = require("./statistics/index");
var appRoutes = [
    { path: '', component: index_1.LoginComponent },
    { path: 'register', component: index_2.RegisterComponent },
    { path: 'dashboard', component: index_3.DashboardComponent },
    { path: 'projects', component: index_4.ProjectsComponent },
    { path: 'tasks', component: index_5.TasksComponent },
    { path: 'projects/new_task', component: index_6.NewTaskComponent },
    { path: 'projects/tasks_list', component: index_7.TasksListComponent },
    { path: 'developers', component: index_8.DevelopersComponent },
    { path: 'statistics', component: index_9.StatisticsComponent },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map