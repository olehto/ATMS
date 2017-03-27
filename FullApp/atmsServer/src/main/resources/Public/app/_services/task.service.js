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
 * Created by EvSpirit on 24.03.2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        this.httpAdress = 'http://localhost:8080';
    }
    //getByEpicTask, getByStatus
    TaskService.prototype.getById = function (id) {
        return this.http.get(this.httpAdress + '/api/task/' + id).map(function (response) { return response.json(); });
    };
    TaskService.prototype.create = function (task) {
        var body = JSON.stringify(task);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.httpAdress + '/api/task/', body, { headers: headers }).map(function (response) { return response.json(); });
    };
    TaskService.prototype.update = function (task) {
        return this.http.put(this.httpAdress + '/api/task/' + task, task).map(function (response) { return response.json(); });
    };
    TaskService.prototype.delete = function (id) {
        return this.http.delete(this.httpAdress + '/api/task/' + id).map(function (response) { return response.json(); });
    };
    TaskService.prototype.getByPriority = function (id) {
        return this.http.get(this.httpAdress + '/api/task/priority/' + id).map(function (response) { return response.json(); });
    };
    TaskService.prototype.getByType = function (id) {
        return this.http.get(this.httpAdress + '/api/task/type/' + id).map(function (response) { return response.json(); });
    };
    TaskService.prototype.getByProject = function (id) {
        return this.http.get(this.httpAdress + '/api/task/project/' + id).map(function (response) { return response.json(); });
    };
    // private helper methods
    TaskService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map