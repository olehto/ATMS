/**
 * Created by Lenovo on 26.03.2017.
 */
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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var project_service_1 = require("../_services/project.service");
var project_1 = require("../_models/project");
var task_service_1 = require("../_services/task.service");
var task_1 = require("../_models/task");
var user_service_1 = require("../_services/user.service");
var ProjectsComponent = (function () {
    function ProjectsComponent(taskService, projectService, userService, route, router) {
        var _this = this;
        this.taskService = taskService;
        this.projectService = projectService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.devId = JSON.parse(localStorage.getItem('token')).developer_id;
        this.project = new project_1.Project();
        this.task = new task_1.Task();
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.id = queryParam['id'];
        });
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        if (this.id === undefined) {
            var returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        }
        this.fill();
    };
    ProjectsComponent.prototype.fill = function () {
        var _this = this;
        this.getTask(this.id).subscribe(function (response) {
            _this.task = response;
        });
        this.getProject(this.id).subscribe(function (response) {
            _this.project = response;
        });
        this.getAllTasks().subscribe(function (response) {
            _this.tasks = response;
        });
        this.getAllProjects().subscribe(function (response) {
            _this.projects = response;
        });
    };
    ProjectsComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.devId);
    };
    ProjectsComponent.prototype.getTask = function (id) {
        return this.taskService.getById(this.id);
    };
    ProjectsComponent.prototype.getProject = function (id) {
        return this.projectService.getById(this.id);
    };
    ProjectsComponent.prototype.getAllProjects = function () {
        return this.projectService.getAll();
    };
    ProjectsComponent.prototype.getAllTasks = function () {
        return this.taskService.getAll();
    };
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'projects',
        styleUrls: ['projects.component.css'],
        templateUrl: 'projects.component.html',
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        project_service_1.ProjectService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], ProjectsComponent);
exports.ProjectsComponent = ProjectsComponent;
//# sourceMappingURL=projects.component.js.map