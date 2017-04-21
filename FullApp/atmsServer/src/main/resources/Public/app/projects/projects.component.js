/**
 * Created by Lenovo on 26.03.2017.
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
var ProjectsComponent = (function () {
    function ProjectsComponent(taskService, route, router) {
        var _this = this;
        this.taskService = taskService;
        this.route = route;
        this.router = router;
        this.condition = true;
        this.token = true;
        this.token2 = true;
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.id = queryParam['id'];
        });
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        if (this.id === undefined) {
            var returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
            this.router.navigate([returnUrl]);
        }
    };
    ProjectsComponent.prototype.toggle = function () {
        this.condition = !this.condition;
    };
    ProjectsComponent.prototype.hidden = function () {
        this.token = !this.token;
    };
    ProjectsComponent.prototype.hidden2 = function () {
        this.token2 = !this.token2;
    };
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'projects',
        styleUrls: ['projects.component.css'],
        templateUrl: 'projects.component.html',
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        router_1.ActivatedRoute,
        router_1.Router])
], ProjectsComponent);
exports.ProjectsComponent = ProjectsComponent;
//# sourceMappingURL=projects.component.js.map