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
var sprint_service_1 = require("../_services/sprint.service");
var EditSprintComponent = (function () {
    function EditSprintComponent(sprintService, userService, route, router) {
        var _this = this;
        this.sprintService = sprintService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.id = queryParam['id'];
        });
    }
    EditSprintComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    EditSprintComponent.prototype.update = function () {
        var _this = this;
        this.sprintService.updateSprint(this.model).subscribe(function (response) {
            console.log(response);
            _this.router.navigate(['/projects_list']);
        });
    };
    EditSprintComponent.prototype.fill = function () {
        var _this = this;
        this.getAllSprint().subscribe(function (response) {
            _this.sprints = response;
        });
        this.sprintService.getById(this.id).subscribe(function (response) {
            console.log(response);
            _this.model.sprintId = response.sprintId;
            _this.model.project = response.sprint.project.title;
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
            temp = new Date(response.dateEnd);
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
            _this.model.dateEnd = date;
        });
    };
    EditSprintComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    EditSprintComponent.prototype.getAllSprint = function () {
        return this.sprintService.getAll();
    };
    return EditSprintComponent;
}());
EditSprintComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-sprint',
        templateUrl: 'edit_sprint.component.html'
    }),
    __metadata("design:paramtypes", [sprint_service_1.SprintService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], EditSprintComponent);
exports.EditSprintComponent = EditSprintComponent;
//# sourceMappingURL=edit_sprint.component.js.map