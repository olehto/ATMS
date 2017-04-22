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
var router_1 = require("@angular/router");
var task_service_1 = require("../_services/task.service");
var task_1 = require("../_models/task");
var TasksComponent = (function () {
    function TasksComponent(taskService, route, router) {
        var _this = this;
        this.taskService = taskService;
        this.route = route;
        this.router = router;
        this.model = {};
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
    TasksComponent.prototype.print = function () {
        this.fill();
        console.log(this.task);
    };
    TasksComponent.prototype.fill = function () {
        var _this = this;
        this.getTask(this.id).subscribe(function (response) {
            _this.task = response;
        });
    };
    TasksComponent.prototype.getTask = function (id) {
        return this.taskService.getById(id);
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
        router_1.ActivatedRoute,
        router_1.Router])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map