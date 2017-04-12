"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var priority_1 = require("./priority");
var type_1 = require("./type");
/**
 * Created by EvSpirit on 24.03.2017.
 */
var Task = (function () {
    function Task() {
        //this.parent=new Task();
        this.developer = new user_1.User();
        this.priority = new priority_1.Priority();
        this.type = new type_1.Type();
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.js.map