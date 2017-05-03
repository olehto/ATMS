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
import {User} from "../_models/user";

@Component ({
    moduleId: module.id,
    selector: 'projects',
    styleUrls:['projects.component.css'],
    templateUrl: 'projects.component.html',
})

export class ProjectsComponent implements OnInit{
    model: any = {};
    project: Project;
    task: Task;
    nickname: string;
    projects: Project[];
    tasks: Task [];
    id: number;
    devId:number;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private projectService: ProjectService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.devId=JSON.parse(localStorage.getItem('token')).developer_id;
        this.project = new Project();
        this.task = new Task();
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['id'];
            }
        );
    }


    ngOnInit() {
        if(this.id===undefined){
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        }
        this.fill();
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
        this.getAllTasks().subscribe(
            (response)=>{
                this.tasks = response;
            }
        );
        this.getAllProjects().subscribe(
            (response)=>{
                this.projects = response;
            }
        );

    }
    getDeveloper(id:number){
        return this.userService.getById(this.devId);
    }
    getTask(id: number){
        return this.taskService.getById(this.id);
    }
    getProject(id:number){
        return this.projectService.getById(this.id);
    }
    getAllProjects(){
        return this.projectService.getAll();
    }
    getAllTasks(){
        return this.taskService.getAll();
    }
}
