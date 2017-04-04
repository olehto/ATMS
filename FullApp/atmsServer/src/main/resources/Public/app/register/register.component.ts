/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserService,PriorityService,TaskService,ProjectService,TechnologyService,TypeService } from '../_services/index';
import {Project} from "../_models/project";
import {Task} from "../_models/task";


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
    private projectService: ProjectService) { }

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