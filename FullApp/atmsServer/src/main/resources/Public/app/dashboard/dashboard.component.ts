/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Task} from "../_models/task";
import {TaskService} from "../_services/task.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../_services/user.service";
import {Project} from "../_models/project";
import {ProjectService} from "../_services/project.service";

@Component ({
    moduleId: module.id,
    selector: 'dashboard',
    styleUrls:['dashboard.component.css'],
    templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit{
    model: any = {};
    task: Task;
    tasks: Task [];
    developer: User;
    projects: Project[];
    id: number;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private projectService: ProjectService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.task = new Task();
        this.developer = new User();
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['id'];
            }
        );
    }

    ngOnInit() {
        this.fill();
    }

    fill(){
        this.getTask(this.id).subscribe(
            (response)=> {
                this.task=response;
            }
        );
        this.getAllTasks().subscribe(
            (response)=>{
                this.tasks=response;
                console.log(response);
            }
        );
        this.getDeveloper(this.id).subscribe(
            (response)=>{
                this.developer=response;
            }
        );
        this.getAllProjects().subscribe(
            (response)=>{
                this.projects = response;
                console.log(response);
            }
        );
    }
    getTask(id: number){
        return this.taskService.getById(this.id);
    }
    getAllTasks(){
        return this.taskService.getAll();
    }
    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }
    getAllProjects(){
        return this.projectService.getAll();
    }
}
