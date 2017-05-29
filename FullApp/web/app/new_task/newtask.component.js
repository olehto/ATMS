/**
 * Created by Lenovo on 29.03.2017.
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
var task_service_1 = require("../_services/task.service");
var user_service_1 = require("../_services/user.service");
var project_service_1 = require("../_services/project.service");
var type_service_1 = require("../_services/type.service");
var status_service_1 = require("../_services/status.service");
var priority_service_1 = require("../_services/priority.service");
var sprint_service_1 = require("../_services/sprint.service");
var NewTaskComponent = (function () {
    function NewTaskComponent(taskService, userService, projectService, typeService, sprintService, statusService, priorityService, route, router) {
        this.taskService = taskService;
        this.userService = userService;
        this.projectService = projectService;
        this.typeService = typeService;
        this.sprintService = sprintService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.developers = [];
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.id = JSON.parse(localStorage.getItem('token')).developer_id;
    }
    NewTaskComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    NewTaskComponent.prototype.fill = function () {
        var _this = this;
        this.getAllDevelopers().subscribe(function (response) {
            _this.developers = response;
        });
        this.getAllTasks().subscribe(function (response) {
            _this.tasks = response;
        });
        this.getAllProjects().subscribe(function (response) {
            _this.projects = response;
        });
        this.statuses = JSON.parse(sessionStorage.getItem('statuses'));
        this.priorities = JSON.parse(sessionStorage.getItem('priorities'));
        this.types = JSON.parse(sessionStorage.getItem('types'));
    };
    NewTaskComponent.prototype.sprintLoading = function (newValue) {
        console.log(newValue);
        this.sprintService.getByProject(this.model.project).subscribe(function (response) {
            /////загрузка спринтов
        });
    };
    NewTaskComponent.prototype.newtask = function () {
        var _this = this;
        console.log(this.model);
        this.taskService.create(this.model, parseInt(this.model.project.toLocaleString()), new Date(this.model.start).getTime(), new Date(this.model.finish).getTime()).subscribe(function (response) {
            console.log(response);
            _this.router.navigate(['/tasks_list']);
        });
    };
    NewTaskComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    NewTaskComponent.prototype.getAllDevelopers = function () {
        return this.userService.getAll();
    };
    NewTaskComponent.prototype.getAllTasks = function () {
        return this.taskService.getAll();
    };
    NewTaskComponent.prototype.getAllProjects = function () {
        return this.projectService.getAll();
    };
    return NewTaskComponent;
}());
NewTaskComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'new-task',
        templateUrl: 'newtask.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        user_service_1.UserService,
        project_service_1.ProjectService,
        type_service_1.TypeService, sprint_service_1.SprintService,
        status_service_1.StatusService, priority_service_1.PriorityService,
        router_1.ActivatedRoute,
        router_1.Router])
], NewTaskComponent);
exports.NewTaskComponent = NewTaskComponent;
//# sourceMappingURL=newtask.component.js.map