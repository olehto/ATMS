"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Lenovo on 15.03.2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var task_1 = require("../_models/task");
var task_service_1 = require("../_services/task.service");
var user_1 = require("../_models/user");
var user_service_1 = require("../_services/user.service");
var project_service_1 = require("../_services/project.service");
var DashboardComponent = (function () {
    function DashboardComponent(taskService, userService, projectService, route, router) {
        var _this = this;
        this.taskService = taskService;
        this.userService = userService;
        this.projectService = projectService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.task = new task_1.Task();
        this.developer = new user_1.User();
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.id = queryParam['id'];
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    DashboardComponent.prototype.fill = function () {
        var _this = this;
        this.getTask(this.id).subscribe(function (response) {
            _this.task = response;
        });
        this.getAllTasks().subscribe(function (response) {
            _this.tasks = response;
            console.log(response);
        });
        this.getDeveloper(this.id).subscribe(function (response) {
            _this.developer = response;
        });
        this.getAllProjects().subscribe(function (response) {
            _this.projects = response;
            console.log(response);
        });
    };
    DashboardComponent.prototype.getTask = function (id) {
        return this.taskService.getById(this.id);
    };
    DashboardComponent.prototype.getAllTasks = function () {
        return this.taskService.getAll();
    };
    DashboardComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    DashboardComponent.prototype.getAllProjects = function () {
        return this.projectService.getAll();
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard',
        styleUrls: ['dashboard.component.css'],
        templateUrl: 'dashboard.component.html',
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        user_service_1.UserService,
        project_service_1.ProjectService,
        router_1.ActivatedRoute,
        router_1.Router])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map