/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/index';


@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'reg.component.html'
})
export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.loading = false;
                });
    }
}