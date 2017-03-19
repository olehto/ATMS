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
 * Created by Serpent on 09.03.2017.
 */
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var Task1Component = (function () {
    function Task1Component(userService) {
        this.userService = userService;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    Task1Component.prototype.ngOnInit = function () {
        this.loadAllUsers();
    };
    Task1Component.prototype.deleteUser = function (id) {
        var _this = this;
        this.userService.delete(id).subscribe(function () { _this.loadAllUsers(); });
    };
    Task1Component.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
    };
    return Task1Component;
}());
Task1Component = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'task1.component.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService])
], Task1Component);
exports.Task1Component = Task1Component;
//# sourceMappingURL=task1.component.js.map