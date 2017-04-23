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
var index_1 = require("../_services/index");
var RegisterComponent = (function () {
    function RegisterComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.model = {};
        this.loading = false;
        this.devTypes = [];
        this.getDevTypes();
    }
    RegisterComponent.prototype.getDevTypes = function () {
        var _this = this;
        this.userService.getDevTypes().subscribe(function (response) {
            _this.devTypes = response;
            console.log(_this.devTypes);
        });
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.userService.getDevType(this.model.devTypeId)
            .subscribe(function (data) {
            _this.model.devType = data;
            console.log(data);
            _this.create();
        });
    };
    RegisterComponent.prototype.create = function () {
        var _this = this;
        this.userService.create(this.model)
            .subscribe(function (data) {
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.loading = false;
        });
    };
    RegisterComponent.prototype.loadUsers = function () {
        var _this = this;
        this.userService.getAll()
            .subscribe(function (response) {
            console.log(response);
        }, function (error) {
            _this.loading = false;
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'register',
        templateUrl: 'reg.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map