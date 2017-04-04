/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";

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
        private authenticationService: AuthenticationService){}


    ngOnInit()
    {
        // reset login status
        this.authenticationService.logout();
        console.log(localStorage.getItem('token'));
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    login() {
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                response => {
                    console.log(response);
                    localStorage.setItem('token', response.access_token);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    alert(error);
                }
            );
    }

}