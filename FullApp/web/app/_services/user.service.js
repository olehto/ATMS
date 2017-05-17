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
var http_1 = require("@angular/http");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.httpAdress = 'http://localhost:8080';
    }
    UserService.prototype.getAll = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress + '/api/developer/', { headers: headers }).map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (id) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress + '/api/developer/' + id, { headers: headers }).map(function (response) { return response.json(); });
    };
    UserService.prototype.remind = function (email) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress + '/api/developer/' + email, { headers: headers }).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        /*this.getDevType(user.devTypeId).subscribe(
            response => {
                console.log(response);
                user.devType=response;
            },
            error => {
                console.log(error);
                alert(error);
            }
        );*/
        user.devTypeId = undefined;
        var body = JSON.stringify(user);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.httpAdress + '/register/', body, { headers: headers }).map(function (response) { return response.json(); });
    };
    UserService.prototype.update = function (user) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.put(this.httpAdress + '/api/developer/' + user, user, { headers: headers }).map(function (response) { return response.json(); });
    };
    UserService.prototype.delete = function (id) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.delete(this.httpAdress + '/api/developer/' + id, { headers: headers }).map(function (response) { return response.json(); });
    };
    UserService.prototype.getDevTypes = function () {
        /*let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);*/
        return this.http.get(this.httpAdress + '/api/devType/get' /*,{headers: headers}*/).map(function (response) { return response.json(); });
    };
    UserService.prototype.getDevType = function (id) {
        /*let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);*/
        return this.http.get(this.httpAdress + '/api/devType/get/' + id /*,{headers: headers}*/).map(function (response) { return response.json(); });
    };
    UserService.prototype.getCurrent = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress + '/api/developer/current', { headers: headers }).map(function (response) { return response.json(); });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map