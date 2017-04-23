/**
 * Created by Lenovo on 26.03.2017.
 */

import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProjectService} from "../_services/project.service";
import {Project} from "../_models/project";
import {TaskService} from "../_services/task.service";
import {Task} from "../_models/task";
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../_services/user.service";

@Component ({
    moduleId: module.id,
    selector: 'projects',
    styleUrls:['projects.component.css'],
    templateUrl: 'projects.component.html',
})

export class ProjectsComponent implements OnInit{
    jsObj: any;
    model: any = {};
    project: Project;
    task: Task;
    condition: boolean = true;
    token: boolean = true;
    token2: boolean = true;
    id: number;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private projectService: ProjectService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.project = new Project();
        this.task = new Task();
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['id'];
            }
        );
    }

    toggle(){
        this.condition=!this.condition;
    }
    hidden(){
        this.token = !this.token;
    }
    hidden2(){
        this.token2 = !this.token2;
    }

    ngOnInit() {
        this.fill();
        if(this.id===undefined){
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        }
    }

    fill(){

        this.getTask(this.id).subscribe(
            (response)=> {
                this.task=response;
            }
        );
        this.getProject(this.id).subscribe(
            (response)=>{
                this.project = response;
            }
        );
    }

    getTask(id: number){
        return this.taskService.getById(this.id);
    }
    getProject(id:number){
        return this.projectService.getById(this.id);
    }
}
