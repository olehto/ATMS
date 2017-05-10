/**
 * Created by Hedy on 03.05.2017.
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
var EditProjectComponent = (function () {
    function EditProjectComponent(projectService, userService, route, router) {
        var _this = this;
        this.projectService = projectService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.id = queryParam['id'];
        });
    }
    EditProjectComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    EditProjectComponent.prototype.update = function () {
        var _this = this;
        this.projectService.update(this.model).subscribe(function (response) {
            console.log(response);
            _this.router.navigate(['/projects_list']);
        });
    };
    EditProjectComponent.prototype.fill = function () {
        var _this = this;
        this.getAllProjects().subscribe(function (response) {
            _this.projects = response;
        });
        this.projectService.getById(this.id).subscribe(function (response) {
            console.log(response);
            _this.model.projectId = response.projectId;
            _this.model.description = response.description;
            _this.model.title = response.title;
            var temp = new Date(response.dateStart);
            var date = temp.getFullYear() + "-";
            if (temp.getMonth().toString().length === 1) {
                date += "0" + temp.getMonth() + "-";
            }
            else {
                date += temp.getMonth() + "-";
            }
            if (temp.getDay().toString().length === 1) {
                date += "0" + temp.getDay();
            }
            else {
                date += temp.getDay();
            }
            console.log(date);
            _this.model.dateStart = date;
            temp = new Date(response.deadline);
            date = temp.getFullYear() + "-";
            if (temp.getMonth().toString().length === 1) {
                date += "0" + temp.getMonth() + "-";
            }
            else {
                date += temp.getMonth() + "-";
            }
            if (temp.getDay().toString().length === 1) {
                date += "0" + temp.getDay();
            }
            else {
                date += temp.getDay();
            }
            _this.model.deadline = date;
        });
    };
    EditProjectComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    EditProjectComponent.prototype.getAllProjects = function () {
        return this.projectService.getAll();
    };
    return EditProjectComponent;
}());
EditProjectComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        styleUrls: ['edit_project.component.css'],
        selector: 'edit-project',
        templateUrl: 'edit_project.component.html'
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], EditProjectComponent);
exports.EditProjectComponent = EditProjectComponent;
//# sourceMappingURL=edit_project.component.js.map