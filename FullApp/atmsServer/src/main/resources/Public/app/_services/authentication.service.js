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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.clientId = 'atms';
        this.clientSecret = 'secret';
        this.httpAdress = 'http://localhost:8080/oauth/token';
    }
    AuthenticationService.prototype.handleData = function (res) {
        var body = res.json();
        return body;
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Accept", "application/json");
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
        var options = new http_1.RequestOptions({ headers: headers });
        var params = new http_1.URLSearchParams();
        params.set('password', password);
        params.set('username', username);
        params.set('grant_type', 'password');
        params.set('scope', 'read write');
        params.set('client_secret', this.clientSecret);
        params.set('client_id', this.clientId);
        return this.http.post(this.httpAdress, params.toString(), { headers: headers })
            .map(function (res) { return _this.handleData(res); }); //res => res.json());
    };
    AuthenticationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('token');
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map