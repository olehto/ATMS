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
 * Created by Lenovo on 29.03.2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var task_service_1 = require("../_services/task.service");
var task_1 = require("../_models/task");
var user_service_1 = require("../_services/user.service");
var TasksListComponent = (function () {
    function TasksListComponent(taskService, userService, route, router) {
        this.taskService = taskService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.task = new task_1.Task();
        this.id = JSON.parse(localStorage.getItem('token')).developer_id;
    }
    TasksListComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    TasksListComponent.prototype.fill = function () {
        var _this = this;
        this.getAllTasks().subscribe(function (response) {
            _this.tasks = response;
            for (var j = 0; j < _this.tasks.length; j++) {
                var types = JSON.parse(sessionStorage.getItem('types'));
                for (var i = 0; i < types.length; i++) {
                    if (types[i].typeId == parseInt(_this.tasks[j].type.toLocaleString())) {
                        _this.tasks[j].type = types[i];
                    }
                }
                var statuses = JSON.parse(sessionStorage.getItem('statuses'));
                console.log(statuses);
                for (var i = 0; i < statuses.length; i++) {
                    if (statuses[i].statusId == parseInt(_this.tasks[j].status.toLocaleString())) {
                        _this.tasks[j].status = statuses[i];
                    }
                }
            }
        });
    };
    TasksListComponent.prototype.search = function () {
        var _this = this;
        console.log("Search");
        console.log(this.model.title);
        this.taskService.searchByTitle(this.model.title).subscribe(function (response) {
            _this.tasks = response;
            for (var j = 0; j < _this.tasks.length; j++) {
                var types = JSON.parse(sessionStorage.getItem('types'));
                for (var i = 0; i < types.length; i++) {
                    if (types[i].typeId == parseInt(_this.tasks[j].type.toLocaleString())) {
                        _this.tasks[j].type = types[i];
                    }
                }
                var statuses = JSON.parse(sessionStorage.getItem('statuses'));
                console.log(statuses);
                for (var i = 0; i < statuses.length; i++) {
                    if (statuses[i].statusId == parseInt(_this.tasks[j].status.toLocaleString())) {
                        _this.tasks[j].status = statuses[i];
                    }
                }
            }
        });
    };
    TasksListComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    TasksListComponent.prototype.getAllTasks = function () {
        return this.taskService.getAll();
    };
    TasksListComponent.prototype.hidden = function () {
        this.condition = !this.condition;
    };
    return TasksListComponent;
}());
TasksListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks-list',
        templateUrl: 'taskslist.component.html',
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], TasksListComponent);
exports.TasksListComponent = TasksListComponent;
//# sourceMappingURL=taskslist.component.js.map