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
var task_service_1 = require("../_services/task.service");
var router_1 = require("@angular/router");
var task_1 = require("../_models/task");
var user_service_1 = require("../_services/user.service");
var keyword_service_1 = require("../_services/keyword.service");
var TasksComponent = (function () {
    function TasksComponent(taskService, userService, keywordService, route, router) {
        var _this = this;
        this.taskService = taskService;
        this.userService = userService;
        this.keywordService = keywordService;
        this.route = route;
        this.router = router;
        this.selectedText = '';
        this.model = {};
        this.developers = [];
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
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
    TasksComponent.prototype.lightSelection = function () {
        var userSelection = window.getSelection();
        for (var i = 0; i < userSelection.rangeCount; i++) {
            this.highlight(userSelection.getRangeAt(i));
        }
    };
    TasksComponent.prototype.highlight = function (range) {
        var newNode = document.createElement("span");
        newNode.setAttribute("style", "background-color: yellow; display: inline;");
        range.surroundContents(newNode);
    };
    TasksComponent.prototype.showSelectedText = function (oField) {
        var text = this.task.description.toString();
        if (window.getSelection) {
            text = window.getSelection().toString();
        }
        else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        this.selectedText = text;
        console.log(text);
    };
    TasksComponent.prototype.fill = function () {
        var _this = this;
        this.getTask(this.id).subscribe(function (response) {
            _this.task = response;
            console.log(response);
            _this.getDeveloper(parseInt(_this.task.developer.toLocaleString())).subscribe(function (response) {
                console.log(response);
                _this.task.developer = response;
            });
            var types = JSON.parse(sessionStorage.getItem('types'));
            for (var i = 0; i < types.length; i++) {
                if (types[i].typeId == parseInt(_this.task.type.toLocaleString())) {
                    _this.task.type = types[i];
                }
            }
            var priorities = JSON.parse(sessionStorage.getItem('priorities'));
            for (var i = 0; i < priorities.length; i++) {
                if (priorities[i].priorityId == parseInt(_this.task.priority.toLocaleString())) {
                    _this.task.priority = priorities[i];
                }
            }
            var statuses = JSON.parse(sessionStorage.getItem('statuses'));
            for (var i = 0; i < statuses.length; i++) {
                if (statuses[i].statusId == parseInt(_this.task.status.toLocaleString())) {
                    _this.task.status = statuses[i];
                }
            }
        });
    };
    TasksComponent.prototype.keywords = function () {
        this.keywordService.add(this.selectedText, this.id, 0.5).subscribe(function (response) {
            console.log(response);
        });
    };
    TasksComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(id);
    };
    TasksComponent.prototype.getTask = function (id) {
        return this.taskService.getById(this.id);
    };
    TasksComponent.prototype.getAllDevelopers = function () {
        return this.userService.getAll();
    };
    TasksComponent.prototype.getAllTasks = function () {
        return this.taskService.getAll();
    };
    TasksComponent.prototype.inputIdDev = function (id) {
        var _this = this;
        var token = JSON.parse(localStorage.getItem('token'));
        console.log(token);
        this.taskService.take(this.task.taskId.toLocaleString(), token.developer_id).subscribe(function (response) {
            console.log(response);
            _this.task = response;
        });
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks',
        templateUrl: 'tasks.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        user_service_1.UserService,
        keyword_service_1.KeywordService,
        router_1.ActivatedRoute,
        router_1.Router])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map