/**
 * Created by Hedy on 21.05.2017.
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
import {Sprint} from "../_models/sprint";
import {SprintService} from "../_services/sprint.service";

@Component ({
    moduleId: module.id,
    selector: 'sprint-list',
    templateUrl: 'sprint_list.component.html',
})

export class SprintListComponent implements OnInit{
    model: any = {};
    task: Task;
    sprints: Sprint [];
    id: number;
    nickname:string;
    condition: boolean;
    private querySubscription: Subscription;

    constructor(private projectService: ProjectService,
                private sprintService: SprintService,
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
        this.getAllSprint().subscribe(
            (response)=>{
                this.sprints=response;
            }
        );
    }
    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }
    getAllSprint(){
        return this.sprintService.getAll();
    }

}
