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
var KeywordService = (function () {
    function KeywordService(http) {
        this.http = http;
        this.httpAdress = 'http://localhost:8080';
    }
    KeywordService.prototype.getAll = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress + '/api/keyword', { headers: headers }).map(function (response) { return response.json(); });
    };
    KeywordService.prototype.getById = function (id) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress + '/api/keyword/' + id, { headers: headers }).map(function (response) { return response.json(); });
    };
    KeywordService.prototype.add = function (value, taskId, importance) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        var params = new http_1.URLSearchParams();
        params.set('value', value);
        params.set('taskId', taskId);
        params.set('importance', importance + "");
        return this.http.post(this.httpAdress + '/api/keyword', params.toString(), { headers: headers }).map(function (response) { return response.json(); });
    };
    return KeywordService;
}());
KeywordService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], KeywordService);
exports.KeywordService = KeywordService;
//# sourceMappingURL=keyword.service.js.map