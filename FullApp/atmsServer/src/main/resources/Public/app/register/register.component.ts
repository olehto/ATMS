/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserService,PriorityService,TaskService,ProjectService,TechnologyService,TypeService } from '../_services/index';
import {Project} from "../_models/project";
import {Task} from "../_models/task";
import {AlertService} from "../_services/alert.service";
import {error} from "util";


@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'reg.component.html'
})
export class RegisterComponent {
    model: any = {};
    private devType: number;
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
    private typeService: TypeService,
    private technologyService: TechnologyService,
    private taskService: TaskService,
    private priorityService: PriorityService,
    private projectService: ProjectService,
    private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.getDevType(this.model.devTypeId)
            .subscribe(
                data=>{
                    this.model.devType=data;
                    console.log(data);
                    this.create();
                    //this.model.devTypeId-undefined;
                },
                error=>{
                    this.loading=false;
                    this.alertService.error("DevType error");
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
                    if(error.status===0){
                        this.alertService.error("Connection error");
                    }
                    else{
                        this.alertService.error("Wrong data");
                    }
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