"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var priority_1 = require("./priority");
var type_1 = require("./type");
var status_1 = require("./status");
var sprint_1 = require("./sprint");
/**
 * Created by EvSpirit on 24.03.2017.
 */
var Task = (function () {
    function Task() {
        //this.parent=new Task();
        this.status = new status_1.Status();
        this.developer = new user_1.User();
        this.priority = new priority_1.Priority();
        this.type = new type_1.Type();
        this.sprint = new sprint_1.Sprint();
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.js.map