/**
 * Created by Hedy on 25.04.2017.
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
var task_1 = require("../_models/task");
var user_service_1 = require("../_services/user.service");
var MyTasksComponent = (function () {
    function MyTasksComponent(taskService, userService, route, router) {
        this.taskService = taskService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.task = new task_1.Task();
        this.id = JSON.parse(localStorage.getItem('token')).developer_id;
    }
    MyTasksComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    MyTasksComponent.prototype.fill = function () {
        var _this = this;
        this.getAllTasksByDeveloper().subscribe(function (response) {
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
        /*this.getAllTasksByDeveloper(this.id).subscribe(
            (response)=>{
                this.tasks = response;
            }
        );*/
    };
    MyTasksComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    MyTasksComponent.prototype.getAllTasks = function () {
        return this.taskService.getAll();
    };
    MyTasksComponent.prototype.getAllTasksByDeveloper = function () {
        return this.taskService.getByDeveloper(this.id);
    };
    MyTasksComponent.prototype.hidden = function () {
        this.condition = !this.condition;
    };
    return MyTasksComponent;
}());
MyTasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks-list',
        templateUrl: 'my_tasks.component.html',
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], MyTasksComponent);
exports.MyTasksComponent = MyTasksComponent;
//# sourceMappingURL=my_tasks.component.js.map