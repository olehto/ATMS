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
 * Created by Lenovo on 15.03.2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../_services/authentication.service");
var alert_service_1 = require("../_services/alert.service");
var NewPasswordComponent = (function () {
    function NewPasswordComponent(route, router, authenticationService, alertService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.model.email = queryParam['email'];
            _this.model.token = queryParam['token'];
        });
    }
    NewPasswordComponent.prototype.change = function () {
        var _this = this;
        this.authenticationService.change(this.model.email, this.model.token, this.model.password)
            .subscribe(function (response) {
            console.log(response);
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            if (error.status === 0) {
                _this.alertService.error("Connection error");
            }
            else {
                _this.alertService.error("Wrong data");
            }
        });
    };
    return NewPasswordComponent;
}());
NewPasswordComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'newpass',
        templateUrl: 'newpass.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        authentication_service_1.AuthenticationService,
        alert_service_1.AlertService])
], NewPasswordComponent);
exports.NewPasswordComponent = NewPasswordComponent;
//# sourceMappingURL=newpass.component.js.map