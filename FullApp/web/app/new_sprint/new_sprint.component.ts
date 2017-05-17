/**
 * Created by Hedy on 25.04.2017.
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
import {SprintService} from "../_services/sprint.service";

@Component({
    moduleId: module.id,
    selector: 'new-sprint',
    templateUrl: 'new_sprint.component.html'
})

export class NewSprintComponent implements OnInit {
    model: any = {};
    projects: Project[];
    nickname:string;
    id: number;

    constructor(private sprintService: SprintService,
                private projectService: ProjectService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router){
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.id=JSON.parse(localStorage.getItem('token')).developer_id;
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
    newproject(){
        this.sprintService.createSprint(this.model).subscribe(
            response=>{
                console.log(response);
                this.router.navigate(['/projects_list']);
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
