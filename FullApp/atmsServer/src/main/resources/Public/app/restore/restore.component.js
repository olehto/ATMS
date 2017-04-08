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
var RestoreComponent = (function () {
    function RestoreComponent(route, router, authenticationService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.loading = false;
    }
    RestoreComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/newpass';
    };
    RestoreComponent.prototype.restore = function () {
        var _this = this;
        this.authenticationService.restore(this.model.email)
            .subscribe(function (response) {
            console.log(response);
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            console.log(error);
            alert(error);
        });
    };
    return RestoreComponent;
}());
RestoreComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        styleUrls: ['restore.component.css'],
        selector: 'restore',
        templateUrl: 'restore.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        authentication_service_1.AuthenticationService])
], RestoreComponent);
exports.RestoreComponent = RestoreComponent;
//# sourceMappingURL=restore.component.js.map