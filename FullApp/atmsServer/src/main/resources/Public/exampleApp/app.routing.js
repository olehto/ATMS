"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Serpent on 09.03.2017.
 */
var router_1 = require("@angular/router");
var index_1 = require("./task1/index");
var index_2 = require("./home/index");
var index_3 = require("./login/index");
var index_4 = require("./register/index");
var index_5 = require("./_guards/index");
var appRoutes = [
    { path: '', component: index_2.HomeComponent },
    { path: 'task1', component: index_1.Task1Component, canActivate: [index_5.AuthGuard] },
    { path: 'login', component: index_3.LoginComponent },
    { path: 'register', component: index_4.RegisterComponent },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map