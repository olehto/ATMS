/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";

@Component({
    moduleId: module.id,
    styleUrls: ['restore.component.css'],
    selector: 'restore',
    templateUrl: 'restore.component.html'
})

export class RestoreComponent implements OnInit {
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
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/newpass';
    }

    restore() {
        this.authenticationService.restore(this.model.email)
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