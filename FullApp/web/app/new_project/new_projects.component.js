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
var user_service_1 = require("../_services/user.service");
var project_service_1 = require("../_services/project.service");
var NewProjectComponent = (function () {
    function NewProjectComponent(projectService, userService, route, router) {
        this.projectService = projectService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.id = JSON.parse(localStorage.getItem('token')).developer_id;
    }
    NewProjectComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    NewProjectComponent.prototype.fill = function () {
        var _this = this;
        this.getAllProjects().subscribe(function (response) {
            _this.projects = response;
        });
    };
    NewProjectComponent.prototype.newproject = function () {
        var _this = this;
        this.projectService.create(this.model).subscribe(function (response) {
            console.log(response);
            _this.router.navigate(['/projects_list']);
        });
    };
    NewProjectComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    NewProjectComponent.prototype.getAllProjects = function () {
        return this.projectService.getAll();
    };
    return NewProjectComponent;
}());
NewProjectComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        styleUrls: ['new_project.component.css'],
        selector: 'new-project',
        templateUrl: 'new_project.component.html'
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], NewProjectComponent);
exports.NewProjectComponent = NewProjectComponent;
//# sourceMappingURL=new_projects.component.js.map