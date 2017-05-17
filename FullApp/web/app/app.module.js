"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng2_charts_1 = require("ng2-charts");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var index_1 = require("./_guards/index");
var index_2 = require("./_services/index");
var index_3 = require("./dashboard/index");
var index_4 = require("./login/index");
var index_5 = require("./register/index");
var index_6 = require("./projects/index");
var index_7 = require("./tasks/index");
var index_8 = require("./new_task/index");
var index_9 = require("./tasks_list/index");
var projects_list_component_1 = require("./projects_list/projects_list.component");
var index_10 = require("./developers/index");
var index_11 = require("./statistics/index");
var index_12 = require("./restore/index");
var index_13 = require("./new_pass/index");
var alert_component_1 = require("./_directives/alert.component");
var alert_service_1 = require("./_services/alert.service");
var new_projects_component_1 = require("./new_project/new_projects.component");
var status_service_1 = require("./_services/status.service");
var my_tasks_component_1 = require("./my_tasks/my_tasks.component");
var my_projects_component_1 = require("./my_projects/my_projects.component");
var edit_task_component_1 = require("./edit_task/edit_task.component");
var edit_project_component_1 = require("./edit_project/edit_project.component");
var sprint_service_1 = require("./_services/sprint.service");
var new_sprint_component_1 = require("./new_sprint/new_sprint.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing,
            ng2_charts_1.ChartsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            index_3.DashboardComponent,
            index_4.LoginComponent,
            index_5.RegisterComponent,
            index_6.ProjectsComponent,
            alert_component_1.AlertComponent,
            index_7.TasksComponent,
            index_8.NewTaskComponent,
            index_9.TasksListComponent,
            projects_list_component_1.ProjectsListComponent,
            new_projects_component_1.NewProjectComponent,
            index_10.DevelopersComponent,
            index_11.StatisticsComponent,
            index_12.RestoreComponent,
            index_13.NewPasswordComponent,
            my_tasks_component_1.MyTasksComponent,
            my_projects_component_1.MyProjectsComponent,
            edit_task_component_1.EditTaskComponent,
            edit_project_component_1.EditProjectComponent,
            new_sprint_component_1.NewSprintComponent
        ],
        providers: [
            index_1.AuthGuard,
            index_2.AuthenticationService,
            index_2.UserService,
            index_2.ProjectService,
            alert_service_1.AlertService,
            index_2.PriorityService,
            index_2.TechnologyService,
            index_2.TypeService,
            index_2.TaskService,
            status_service_1.StatusService,
            sprint_service_1.SprintService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map