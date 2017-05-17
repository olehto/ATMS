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
var task_1 = require("../_models/task");
var project_service_1 = require("../_services/project.service");
var user_service_1 = require("../_services/user.service");
var ProjectsListComponent = (function () {
    function ProjectsListComponent(projectService, userService, route, router) {
        var _this = this;
        this.projectService = projectService;
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
    ProjectsListComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    ProjectsListComponent.prototype.fill = function () {
        var _this = this;
        this.getAllProjects().subscribe(function (response) {
            _this.projects = response;
        });
    };
    ProjectsListComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    ProjectsListComponent.prototype.getAllProjects = function () {
        return this.projectService.getAll();
    };
    ProjectsListComponent.prototype.hidden = function () {
        this.condition = !this.condition;
    };
    return ProjectsListComponent;
}());
ProjectsListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'projects-list',
        templateUrl: 'projects_list.component.html',
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], ProjectsListComponent);
exports.ProjectsListComponent = ProjectsListComponent;
//# sourceMappingURL=projects_list.component.js.map