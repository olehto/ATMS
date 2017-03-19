"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Serpent on 09.03.2017.
 */
var router_1 = require("@angular/router");
var index_1 = require("./login/index");
var index_2 = require("./register/index");
var index_3 = require("./dashboard/index");
var appRoutes = [
    { path: '', component: index_1.LoginComponent },
    { path: 'register', component: index_2.RegisterComponent },
    { path: 'dashboard', component: index_3.DashboardComponent /*, canActivate: [AuthGuard] */ },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map