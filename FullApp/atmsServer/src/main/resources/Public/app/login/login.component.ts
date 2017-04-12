/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";
import {AlertService} from "../_services/alert.service";

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
        private alertService: AlertService) { }


    ngOnInit()
    {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    login() {
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                response => {
                    console.log(response);
                    localStorage.setItem('token', JSON.stringify({access_token:response.access_token,expires:(Date.now()+response.expires_in*1000),
                    refresh_token:response.refresh_token,received:Date.now()}));
                    this.router.navigate([this.returnUrl]);
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