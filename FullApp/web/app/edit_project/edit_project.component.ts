/**
 * Created by Hedy on 03.05.2017.
 */

import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TaskService} from "../_services/task.service";
import {UserService} from "../_services/user.service";
import {ProjectService} from "../_services/project.service";
import {Subscription} from "rxjs/Subscription";
import {User} from "../_models/user";
import {Task} from "../_models/task";
import {Project} from "../_models/project";

@Component({
    moduleId: module.id,
    styleUrls: ['edit_project.component.css'],
    selector: 'edit-project',
    templateUrl: 'edit_project.component.html'
})

export class EditProjectComponent implements OnInit {
    model: any = {};
    projects: Project[];
    nickname:string;
    id: number;
    private querySubscription: Subscription;
    constructor(private projectService: ProjectService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router){
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['id'];
            }
        );
    }
    ngOnInit() {
        this.fill();

    }
    update(){
        this.projectService.update(this.model).subscribe(
            response=>{
                console.log(response);
                this.router.navigate(['/projects_list']);
            }
        )
    }
    fill(){
        this.getAllProjects().subscribe(
            (response)=>{
                this.projects=response;
            }
        );
        this.projectService.getById(this.id).subscribe(
            response=>{
                this.model.projectId=response.projectId;
                this.model.description=response.description;
                this.model.title=response.title;
            }
        )
    }

    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }
    getAllProjects(){
        return this.projectService.getAll();
    }
}
