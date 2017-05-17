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
var user_service_1 = require("../_services/user.service");
var project_service_1 = require("../_services/project.service");
var sprint_service_1 = require("../_services/sprint.service");
var DashboardComponent = (function () {
    function DashboardComponent(taskService, userService, projectService, sprintService, route, router) {
        this.taskService = taskService;
        this.userService = userService;
        this.projectService = projectService;
        this.sprintService = sprintService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.task = new task_1.Task();
        this.id = JSON.parse(localStorage.getItem('token')).developer_id;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        if (this.id === undefined) {
            var returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        }
        this.fill();
    };
    DashboardComponent.prototype.fill = function () {
        var _this = this;
        this.getTask(this.id).subscribe(function (response) {
            _this.task = response;
        });
        this.getAllTasks().subscribe(function (response) {
            _this.tasks = response;
        });
        this.getAllProjects().subscribe(function (response) {
            _this.projects = response;
        });
        this.getAllProjectsByDeveloper(this.id).subscribe(function (response) {
            _this.projectsByDevelopers = response;
            console.log(response);
        });
        this.getByDeveloper(this.id).subscribe(function (response) {
            _this.byDevelopers = response;
            console.log(_this.byDevelopers);
            var priorities = JSON.parse(sessionStorage.getItem('priorities'));
            //let projects: Project[] = [];
            var sprints = [];
            _this.sprintService.getAll().subscribe(function (response) {
                sprints = response;
                console.log(sprints);
                _this.projectService.getAll().subscribe(function (response) {
                    _this.projects = response;
                    for (var j = 0; j < sprints.length; j++) {
                        for (var i = 0; i < _this.projects.length; i++) {
                            if (parseInt(sprints[j].project.toLocaleString()) == _this.projects[i].projectId) {
                                sprints[j].project = _this.projects[i];
                            }
                        }
                    }
                    console.log(sprints);
                    for (var j = 0; j < _this.byDevelopers.length; j++) {
                        for (var i = 0; i < priorities.length; i++) {
                            if (priorities[i].priorityId == parseInt(_this.byDevelopers[j].priority.toLocaleString())) {
                                _this.byDevelopers[j].priority = priorities[i];
                            }
                        }
                        for (var i = 0; i < sprints.length; i++) {
                            if (_this.byDevelopers[j].sprint.toLocaleString() == sprints[i].sprintId.toLocaleString()) {
                                _this.byDevelopers[j].sprint = sprints[i];
                            }
                        }
                    }
                    console.log(_this.byDevelopers);
                    //console.log(projects);
                });
            });
        });
    };
    DashboardComponent.prototype.getTask = function (id) {
        return this.taskService.getById(id);
    };
    DashboardComponent.prototype.getAllTasks = function () {
        return this.taskService.getAll();
    };
    DashboardComponent.prototype.getAllProjects = function () {
        return this.projectService.getAll();
    };
    DashboardComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(id);
    };
    DashboardComponent.prototype.getAllProjectsByDeveloper = function (id) {
        return this.projectService.getByDeveloper(id);
    };
    DashboardComponent.prototype.getByDeveloper = function (id) {
        return this.taskService.getByDeveloper(this.id);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard',
        templateUrl: 'dashboard.component.html',
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        user_service_1.UserService,
        project_service_1.ProjectService,
        sprint_service_1.SprintService,
        router_1.ActivatedRoute,
        router_1.Router])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map