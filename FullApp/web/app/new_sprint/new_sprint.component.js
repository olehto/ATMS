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
var sprint_service_1 = require("../_services/sprint.service");
var NewSprintComponent = (function () {
    function NewSprintComponent(sprintService, projectService, userService, route, router) {
        this.sprintService = sprintService;
        this.projectService = projectService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.id = JSON.parse(localStorage.getItem('token')).developer_id;
    }
    NewSprintComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    NewSprintComponent.prototype.fill = function () {
        var _this = this;
        this.getAllProjects().subscribe(function (response) {
            _this.projects = response;
        });
    };
    NewSprintComponent.prototype.newproject = function () {
        var _this = this;
        this.sprintService.createSprint(this.model).subscribe(function (response) {
            console.log(response);
            _this.router.navigate(['/projects_list']);
        });
    };
    NewSprintComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    NewSprintComponent.prototype.getAllProjects = function () {
        return this.projectService.getAll();
    };
    return NewSprintComponent;
}());
NewSprintComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'new-sprint',
        templateUrl: 'new_sprint.component.html'
    }),
    __metadata("design:paramtypes", [sprint_service_1.SprintService,
        project_service_1.ProjectService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], NewSprintComponent);
exports.NewSprintComponent = NewSprintComponent;
//# sourceMappingURL=new_sprint.component.js.map