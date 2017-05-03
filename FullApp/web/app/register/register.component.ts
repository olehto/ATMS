/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../_services/index';
import {DevType} from "../_models/dev.type";

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'reg.component.html'
})
export class RegisterComponent {
    model: any = {};
    private devType: number;
    loading = false;
    devTypes: DevType [] = [];

    constructor(
        private router: Router,
        private userService: UserService) {

        this.getDevTypes();

    }

    getDevTypes()
    {
        this.userService.getDevTypes().subscribe(
            response=> {
                this.devTypes = response;
                console.log(this.devTypes);
            }
        );
    }
    register() {
        this.loading = true;
        this.userService.getDevType(this.model.devTypeId)
            .subscribe(
                data=>{
                    this.model.devType=data;
                    console.log(data);
                    this.create();

                }
            )

    }
    create(){
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
    loadUsers(){
        this.userService.getAll()
            .subscribe(
                response => {
                    console.log(response);
                },
                error => {
                    this.loading = false;
                });
    }

}