/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";
import {Subscription} from "rxjs";
import {AlertService} from "../_services/alert.service";

@Component({
    moduleId: module.id,
    styleUrls: ['newpass.component.css'],
    selector: 'newpass',
    templateUrl: 'newpass.component.html'
})

export class NewPasswordComponent {
    model: any = {};
    loading = false;
    returnUrl: string;
    private querySubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService)
    {
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.model.email = queryParam['email'];
                this.model.token = queryParam['token'];
            }
        );
    }



    change() {
        this.authenticationService.change(this.model.email, this.model.token, this.model.password)
            .subscribe(
                response => {
                    console.log(response);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    if(error.status===0){
                        this.alertService.error("Connection error");
                    }
                    else{
                        this.alertService.error("Wrong data");
                    }
                }
            );
    }

}