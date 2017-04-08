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
var index_10 = require("./developers/index");
var index_11 = require("./statistics/index");
var ngx_dropdown_1 = require("ngx-dropdown");
var index_12 = require("./restore/index");
var index_13 = require("./new_pass/index");
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
            ng2_charts_1.ChartsModule,
            ngx_dropdown_1.DropdownModule
        ],
        declarations: [
            app_component_1.AppComponent,
            index_3.DashboardComponent,
            index_4.LoginComponent,
            index_5.RegisterComponent,
            index_6.ProjectsComponent,
            index_7.TasksComponent,
            index_8.NewTaskComponent,
            index_9.TasksListComponent,
            index_10.DevelopersComponent,
            index_11.StatisticsComponent,
            index_12.RestoreComponent,
            index_13.NewPasswordComponent
        ],
        providers: [
            index_1.AuthGuard,
            index_2.AuthenticationService,
            index_2.UserService,
            index_2.ProjectService,
            index_2.PriorityService,
            index_2.TechnologyService,
            index_2.TypeService,
            index_2.TaskService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map