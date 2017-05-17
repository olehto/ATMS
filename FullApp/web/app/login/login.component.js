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
var alert_service_1 = require("../_services/alert.service");
var user_service_1 = require("../_services/user.service");
var type_service_1 = require("../_services/type.service");
var priority_service_1 = require("../_services/priority.service");
var status_service_1 = require("../_services/status.service");
var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService, alertService, userService, typeService, priorityService, statusService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.userService = userService;
        this.typeService = typeService;
        this.priorityService = priorityService;
        this.statusService = statusService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(function (response) {
            //console.log(response);
            localStorage.setItem('token', JSON.stringify({ access_token: response.access_token, expires: (Date.now() + response.expires_in * 1000),
                refresh_token: response.refresh_token, received: Date.now() }));
            _this.userService.getCurrent().subscribe(function (response) {
                var temp = JSON.parse(localStorage.getItem('token'));
                var dev = response;
                temp.developer_id = dev.developerId.toLocaleString();
                temp.nickname = dev.nickname;
                localStorage.setItem('token', JSON.stringify(temp));
                var types;
                var priorities;
                var statuses;
                _this.typeService.getAll().subscribe(function (response) {
                    types = response;
                    sessionStorage.setItem('types', JSON.stringify(types));
                });
                _this.priorityService.getAll().subscribe(function (response) {
                    priorities = response;
                    sessionStorage.setItem('priorities', JSON.stringify(priorities));
                });
                _this.statusService.getAll().subscribe(function (response) {
                    statuses = response;
                    sessionStorage.setItem('statuses', JSON.stringify(statuses));
                });
                _this.router.navigate([_this.returnUrl]);
            });
        }, function (error) {
            console.log(error);
            if (error.status === 401) {
                _this.alertService.error("Wrong Username/password");
            }
            else {
                _this.alertService.error("Connection error");
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        authentication_service_1.AuthenticationService,
        alert_service_1.AlertService,
        user_service_1.UserService,
        type_service_1.TypeService,
        priority_service_1.PriorityService,
        status_service_1.StatusService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map