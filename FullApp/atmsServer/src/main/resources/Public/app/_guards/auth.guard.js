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
var authentication_service_1 = require("../_services/authentication.service");
var AuthGuard = (function () {
    function AuthGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        if (localStorage.getItem('token')) {
            var token = JSON.parse(localStorage.getItem('token'));
            // logged in so return true
            if (token.expires - Date.now() > 0) {
                return true;
            }
            else {
                this.authenticationService.refresh().subscribe(function (response) {
                    console.log(response);
                    localStorage.setItem('token', JSON.stringify({ access_token: response.access_token, expires: (Date.now() + response.expires_in * 1000),
                        refresh_token: response.refresh_token, received: Date.now() }));
                    return true;
                }, function (error) {
                    console.log(error);
                    alert(error);
                    _this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return false;
                });
            }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        authentication_service_1.AuthenticationService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map