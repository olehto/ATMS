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
 * Created by Lenovo on 28.03.2017.
 */
/**
 * Created by Lenovo on 15.03.2017.
 */
var core_1 = require("@angular/core");
var task_service_1 = require("../_services/task.service");
var router_1 = require("@angular/router");
var task_1 = require("../_models/task");
var user_service_1 = require("../_services/user.service");
var TasksComponent = (function () {
    function TasksComponent(taskService, userService, route, router) {
        var _this = this;
        this.taskService = taskService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.developers = [];
        this.task = new task_1.Task();
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.id = queryParam['id'];
        });
    }
    TasksComponent.prototype.ngOnInit = function () {
        if (this.id === undefined) {
            var returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        }
        this.fill();
    };
    TasksComponent.prototype.fill = function () {
        var _this = this;
        this.getTask(this.id).subscribe(function (response) {
            _this.task = response;
        });
        this.getAllDevelopers().subscribe(function (response) {
            _this.developers = response;
        });
    };
    TasksComponent.prototype.getTask = function (id) {
        return this.taskService.getById(this.id);
    };
    TasksComponent.prototype.getAllDevelopers = function () {
        return this.userService.getAll();
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks',
        styleUrls: ['tasks.component.css'],
        templateUrl: 'tasks.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map