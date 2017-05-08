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
import {Priority} from "../_models/priority";
import {Type} from "../_models/type";
import {Status} from "../_models/status";
import {TypeService} from "../_services/type.service";
import {StatusService} from "../_services/status.service";
import {PriorityService} from "../_services/priority.service";
import {Sprint} from "../_models/sprint";

@Component({
    moduleId: module.id,
    styleUrls: ['edit_task.component.css'],
    selector: 'edit-task',
    templateUrl: 'edit_task.component.html'
})

export class EditTaskComponent implements OnInit {
    model: any = {};
    tasks: Task[];
    developers: User [] = [];
    projects: Project[];
    priorities: Priority[];
    types: Type[];
    statuses: Status[];
    nickname:string;
    tempTask:Task;
    id: number;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private projectService: ProjectService,
                private typeService: TypeService,
                private statusService: StatusService, private priorityService: PriorityService,
                private route: ActivatedRoute,
                private router: Router) {
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

    fill() {
        this.getAllDevelopers().subscribe(
            (response) => {
                this.developers = response;
            }
        );
        this.getAllTasks().subscribe(
            (response) => {
                this.tasks = response;
            }
        );
        this.getAllProjects().subscribe(
            (response) => {
                this.projects = response;
            }
        );
        this.statuses = JSON.parse(sessionStorage.getItem('statuses'));
        this.priorities = JSON.parse(sessionStorage.getItem('priorities'));
        this.types = JSON.parse(sessionStorage.getItem('types'));
        this.taskService.getById(this.id).subscribe(
            response=>{
                console.log(response);
                this.model.taskId=response.taskId;
                this.model.title=response.title;
                this.model.description=response.description;
                //this.model.start=response.dateStart;
                //this.model.finish=response.finish;
                this.model.duration=response.duration;
                /*this.typeService.getById(parseInt(response.type.toLocaleString())).subscribe(
                    response=>{
                        console.log(response);
                        this.model.type=response;
                        console.log(this.model);
                    }
                )*/
                this.model.type=response.type;
                this.model.status=response.status;
                this.model.priority=response.priority;
                this.model.project="1";
                this.model.developer=JSON.parse(localStorage.getItem('token')).developer_id;
            }
        )
    }

    update(){
        console.log(this.model);
        this.taskService.update(this.model,parseInt(this.model.project.toLocaleString()),this.model.start,this.model.finish).subscribe(
            response=>{
                console.log(response);
                this.router.navigate(['/tasks_list']);
            }
        );
    }

    getDeveloper(id: number) {
        return this.userService.getById(this.id);
    }

    getAllDevelopers() {
        return this.userService.getAll();
    }

    getAllTasks() {
        return this.taskService.getAll();
    }

    getAllProjects() {
        return this.projectService.getAll();
    }
}