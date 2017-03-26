"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Lenovo on 15.03.2017.
 */
var core_1 = require("@angular/core");
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.condition = true;
        this.token = true;
        this.token2 = true;
    }
    DashboardComponent.prototype.toggle = function () {
        this.condition = !this.condition;
    };
    DashboardComponent.prototype.hidden = function () {
        this.token = !this.token;
    };
    DashboardComponent.prototype.hidden2 = function () {
        this.token2 = !this.token2;
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard',
        styleUrls: ['dashboard.component.css'],
        templateUrl: 'dash.component.html',
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map