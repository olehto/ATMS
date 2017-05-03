
/**
 * Created by Lenovo on 29.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from "../_models/user";
import {Project} from "../_models/project";
import {Subscription} from "rxjs/Subscription";
import {TaskService} from "../_services/task.service";
import {Task} from "../_models/task";
import {Type} from "../_models/type";
import {ProjectService} from "../_services/project.service";
import {UserService} from "../_services/user.service";

@Component ({
    moduleId: module.id,
    selector: 'projects-list',
    styleUrls:['projects_list.component.css'],
    templateUrl: 'projects_list.component.html',
})

export class ProjectsListComponent implements OnInit{
    model: any = {};
    task: Task;
    projects: Task [];
    id: number;
    nickname:string;
    condition: boolean;
    private querySubscription: Subscription;

    constructor(private projectService: ProjectService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.task = new Task();
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
        this.getAllProjects().subscribe(
            (response)=>{
                this.projects=response;
            }
        );
    }
    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }
    getAllProjects(){
        return this.projectService.getAll();
    }
    hidden(){
        this.condition = !this.condition;
    }
}
