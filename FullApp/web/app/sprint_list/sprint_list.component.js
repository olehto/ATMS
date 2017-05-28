/**
 * Created by Hedy on 21.05.2017.
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
var task_1 = require("../_models/task");
var project_service_1 = require("../_services/project.service");
var user_service_1 = require("../_services/user.service");
var sprint_service_1 = require("../_services/sprint.service");
var SprintListComponent = (function () {
    function SprintListComponent(projectService, sprintService, userService, route, router) {
        var _this = this;
        this.projectService = projectService;
        this.sprintService = sprintService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.task = new task_1.Task();
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.id = queryParam['id'];
        });
    }
    SprintListComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    SprintListComponent.prototype.fill = function () {
        var _this = this;
        this.getAllSprint().subscribe(function (response) {
            _this.sprints = response;
        });
    };
    SprintListComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    SprintListComponent.prototype.getAllSprint = function () {
        return this.sprintService.getAll();
    };
    return SprintListComponent;
}());
SprintListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sprint-list',
        templateUrl: 'sprint_list.component.html',
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        sprint_service_1.SprintService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], SprintListComponent);
exports.SprintListComponent = SprintListComponent;
//# sourceMappingURL=sprint_list.component.js.map