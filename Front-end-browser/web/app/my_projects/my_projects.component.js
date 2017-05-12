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
 * Created by Hedy on 26.04.2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../_services/user.service");
var project_service_1 = require("../_services/project.service");
var MyProjectsComponent = (function () {
    function MyProjectsComponent(projectService, userService, route, router) {
        this.projectService = projectService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.id = JSON.parse(localStorage.getItem('token')).developer_id;
    }
    MyProjectsComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    MyProjectsComponent.prototype.fill = function () {
        var _this = this;
        this.getAllProjectsByDeveloper(this.id).subscribe(function (response) {
            _this.projects = response;
        });
    };
    MyProjectsComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    MyProjectsComponent.prototype.getAllProjectsByDeveloper = function (id) {
        return this.projectService.getByDeveloper(this.id);
    };
    MyProjectsComponent.prototype.hidden = function () {
        this.condition = !this.condition;
    };
    return MyProjectsComponent;
}());
MyProjectsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks-list',
        templateUrl: 'my_projects.component.html',
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], MyProjectsComponent);
exports.MyProjectsComponent = MyProjectsComponent;
//# sourceMappingURL=my_projects.component.js.map