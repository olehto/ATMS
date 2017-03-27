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
 * Created by EvSpirit on 22.03.2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
        this.httpAdress = 'http://localhost:8080';
    }
    ProjectService.prototype.getAll = function () {
        return this.http.get(this.httpAdress + '/api/project/').map(function (response) { return response.json(); });
    };
    ProjectService.prototype.getById = function (id) {
        return this.http.get(this.httpAdress + '/api/project/' + id).map(function (response) { return response.json(); });
    };
    ProjectService.prototype.create = function (project) {
        var body = JSON.stringify(project);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.httpAdress + '/api/project/', body, { headers: headers }).map(function (response) { return response.json(); });
    };
    ProjectService.prototype.getByDeveloper = function (id) {
        return this.http.get(this.httpAdress + '/api/project/developer/' + id).map(function (response) { return response.json(); });
    };
    ProjectService.prototype.update = function (project) {
        return this.http.put(this.httpAdress + '/api/project/' + project, project).map(function (response) { return response.json(); });
    };
    ProjectService.prototype.delete = function (id) {
        return this.http.delete(this.httpAdress + '/api/project/' + id).map(function (response) { return response.json(); });
    };
    // private helper methods
    ProjectService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return ProjectService;
}());
ProjectService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map