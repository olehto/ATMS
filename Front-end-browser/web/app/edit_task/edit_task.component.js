/**
 * Created by Hedy on 03.05.2017.
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
var EditTaskComponent = (function () {
    function EditTaskComponent(taskService, userService, projectService, typeService, statusService, priorityService, route, router) {
        var _this = this;
        this.taskService = taskService;
        this.userService = userService;
        this.projectService = projectService;
        this.typeService = typeService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.developers = [];
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.id = queryParam['id'];
        });
    }
    EditTaskComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    EditTaskComponent.prototype.fill = function () {
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
        this.taskService.getById(this.id).subscribe(function (response) {
            console.log(response);
            _this.model.taskId = response.taskId;
            _this.model.title = response.title;
            _this.model.description = response.description;
            var temp = new Date(response.dateStart);
            var date = temp.getFullYear() + "-";
            if (temp.getMonth().toString().length === 1) {
                date += "0" + temp.getMonth() + "-";
            }
            else {
                date += temp.getMonth() + "-";
            }
            if (temp.getDay().toString().length === 1) {
                date += "0" + temp.getDay();
            }
            else {
                date += temp.getDay();
            }
            console.log(date);
            _this.model.start = date;
            temp = new Date(response.deadline);
            date = temp.getFullYear() + "-";
            if (temp.getMonth().toString().length === 1) {
                date += "0" + temp.getMonth() + "-";
            }
            else {
                date += temp.getMonth() + "-";
            }
            if (temp.getDay().toString().length === 1) {
                date += "0" + temp.getDay();
            }
            else {
                date += temp.getDay();
            }
            _this.model.finish = date;
            _this.model.duration = response.duration;
            /*this.typeService.getById(parseInt(response.type.toLocaleString())).subscribe(
             response=>{
             console.log(response);
             this.model.type=response;
             console.log(this.model);
             }
             )*/
            _this.model.type = response.type;
            _this.model.status = response.status;
            _this.model.priority = response.priority;
            _this.model.project = "1";
            _this.model.developer = JSON.parse(localStorage.getItem('token')).developer_id;
            console.log(_this.model);
        });
    };
    EditTaskComponent.prototype.update = function () {
        var _this = this;
        console.log(this.model);
        this.taskService.update(this.model, parseInt(this.model.project.toLocaleString()), new Date(this.model.start).getTime(), new Date(this.model.finish).getTime()).subscribe(function (response) {
            console.log(response);
            _this.router.navigate(['/tasks_list']);
        });
    };
    EditTaskComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    EditTaskComponent.prototype.getAllDevelopers = function () {
        return this.userService.getAll();
    };
    EditTaskComponent.prototype.getAllTasks = function () {
        return this.taskService.getAll();
    };
    EditTaskComponent.prototype.getAllProjects = function () {
        return this.projectService.getAll();
    };
    return EditTaskComponent;
}());
EditTaskComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-task',
        templateUrl: 'edit_task.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        user_service_1.UserService,
        project_service_1.ProjectService,
        type_service_1.TypeService,
        status_service_1.StatusService, priority_service_1.PriorityService,
        router_1.ActivatedRoute,
        router_1.Router])
], EditTaskComponent);
exports.EditTaskComponent = EditTaskComponent;
//# sourceMappingURL=edit_task.component.js.map