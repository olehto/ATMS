/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    styleUrls: ['newpass.component.css'],
    selector: 'newpass',
    templateUrl: 'newpass.component.html'
})

export class NewPasswordComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    private querySubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService)
    {
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.model.email = queryParam['email'];
                this.model.token = queryParam['token'];
            }
        );
    }


    ngOnInit()
    {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }

    change() {
        this.authenticationService.change(this.model.email, this.model.token, this.model.password)
            .subscribe(
                response => {
                    console.log(response);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    alert(error);
                }
            );
    }

}