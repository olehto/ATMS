/**
 * Created by Lenovo on 29.03.2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NewTaskComponent = (function () {
    function NewTaskComponent() {
    }
    return NewTaskComponent;
}());
NewTaskComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        styleUrls: ['newtask.component.css'],
        selector: 'new-task',
        templateUrl: 'newtask.component.html'
    })
], NewTaskComponent);
exports.NewTaskComponent = NewTaskComponent;
//# sourceMappingURL=newtask.component.js.map