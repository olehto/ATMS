/**
 * Created by Hedy on 26.04.2017.
 */
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from "../_models/user";
import {Project} from "../_models/project";
import {Subscription} from "rxjs/Subscription";
import {TaskService} from "../_services/task.service";
import {Task} from "../_models/task";
import {Type} from "../_models/type";
import {UserService} from "../_services/user.service";
import {Status} from "../_models/status";
import {ProjectService} from "../_services/project.service";

@Component ({
    moduleId: module.id,
    selector: 'tasks-list',
    templateUrl: 'my_projects.component.html',
})

export class MyProjectsComponent implements OnInit{
    model: any = {};
    projects: Project [];
    id: number;
    nickname:string;
    condition: boolean;

    constructor(private projectService: ProjectService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.id=JSON.parse(localStorage.getItem('token')).developer_id;
    }

    ngOnInit() {

        this.fill();
    }

    fill(){

        this.getAllProjectsByDeveloper(this.id).subscribe(
            (response)=>{
                this.projects = response;
            }
        );

    }
    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }
    getAllProjectsByDeveloper(id:number){
        return this.projectService.getByDeveloper(this.id)
    }
    hidden(){
        this.condition = !this.condition;
    }
}
