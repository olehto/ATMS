/**
 * Created by Lenovo on 02.04.2017.
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
var user_1 = require("../_models/user");
var user_service_1 = require("../_services/user.service");
var task_service_1 = require("../_services/task.service");
var DevelopersComponent = (function () {
    function DevelopersComponent(userService, taskService, route, router) {
        var _this = this;
        this.userService = userService;
        this.taskService = taskService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.user = new user_1.User();
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.id = queryParam['id'];
        });
    }
    DevelopersComponent.prototype.ngOnInit = function () {
        if (this.id === undefined) {
            this.id = JSON.parse(localStorage.getItem('token')).developer_id;
            /*let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);*/
        }
        this.fill();
    };
    DevelopersComponent.prototype.toggle = function () {
        this.condition = !this.condition;
    };
    DevelopersComponent.prototype.fill = function () {
        var _this = this;
        this.getUser(this.id).subscribe(function (response) {
            _this.user = response;
            console.log(response);
        });
        this.getAllTasks().subscribe(function (response) {
            _this.tasks = response;
            console.log(response);
        });
        this.getAllDevelopers().subscribe(function (response) {
            _this.developers = response;
        });
        this.getDeveloper(this.id).subscribe(function (response) {
            _this.user = response;
        });
    };
    DevelopersComponent.prototype.getUser = function (id) {
        return this.userService.getById(this.id);
    };
    DevelopersComponent.prototype.getAllTasks = function () {
        return this.taskService.getAll();
    };
    DevelopersComponent.prototype.getAllDevelopers = function () {
        return this.userService.getAll();
    };
    DevelopersComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    return DevelopersComponent;
}());
DevelopersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'developers',
        templateUrl: 'developers.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        task_service_1.TaskService,
        router_1.ActivatedRoute,
        router_1.Router])
], DevelopersComponent);
exports.DevelopersComponent = DevelopersComponent;
//# sourceMappingURL=developers.component.js.map