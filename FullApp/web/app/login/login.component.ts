import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";
import {AlertService} from "../_services/alert.service";
import {Token} from "../_models/token";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {Type} from "../_models/type";
import {Priority} from "../_models/priority";
import {Technology} from "../_models/technology";
import {TypeService} from "../_services/type.service";
import {PriorityService} from "../_services/priority.service";
import {TechnologyService} from "../_services/technology.service";
import {StatusService} from "../_services/status.service";
import {Status} from "../_models/status";

@Component({
    moduleId: module.id,
    styleUrls: ['login.component.css'],
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private typeService: TypeService,
        private priorityService:PriorityService,
        private statusService: StatusService) { }


    ngOnInit()
    {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                response => {
                    //console.log(response);
                    localStorage.setItem('token', JSON.stringify({access_token:response.access_token,expires:(Date.now()+response.expires_in*1000),
                        refresh_token:response.refresh_token,received:Date.now()}));
                    this.userService.getCurrent().subscribe(
                        response=>{
                            let temp:Token=JSON.parse(localStorage.getItem('token'));
                            let dev:User=response;
                            temp.developer_id=dev.developerId.toLocaleString();
                            temp.nickname=dev.nickname;
                            localStorage.setItem('token',JSON.stringify(temp));
                            let types:Type[];
                            let priorities:Priority[];
                            let statuses:Status[];
                            this.typeService.getAll().subscribe(
                                response=>{
                                    types=response;
                                    sessionStorage.setItem('types',JSON.stringify(types));
                                }
                            );
                            this.priorityService.getAll().subscribe(
                                response=>{
                                    priorities=response;
                                    sessionStorage.setItem('priorities',JSON.stringify(priorities));
                                }
                            );
                            this.statusService.getAll().subscribe(
                                response=>{
                                    statuses=response;
                                    sessionStorage.setItem('statuses',JSON.stringify(statuses));
                                }
                            );
                            this.router.navigate([this.returnUrl]);
                        }
                    )

                },
                error => {
                    console.log(error);
                    if(error.status===401){
                        this.alertService.error("Wrong Username/password")
                    }
                    else{
                        this.alertService.error("Connection error");
                    }
                }
            );
    }

}