/**
 * Created by Lenovo on 29.03.2017.
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
import {SprintService} from "../_services/sprint.service";

@Component({
    moduleId: module.id,
    selector: 'new-task',
    templateUrl: 'newtask.component.html'
})

export class NewTaskComponent implements OnInit {
    model: any = {};
    tasks: Task[];
    developers: User [] = [];
    projects: Project[];
    priorities: Priority[];
    types: Type[];
    sprints: Sprint[];
    statuses: Status[];
    nickname:string;
    tempTask:Task;
    id: number;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private sprintService: SprintService,
                private projectService: ProjectService,
                private typeService: TypeService, private sprintService: SprintService,
                private statusService: StatusService, private priorityService: PriorityService,
                private route: ActivatedRoute,
                private router: Router) {
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.id=JSON.parse(localStorage.getItem('token')).developer_id;
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
        this.getAllSprint().subscribe(
            (response) => {
                this.sprints = response;
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
    }
    sprintLoading(newValue){
        console.log(newValue);
        this.sprintService.getByProject(this.model.project).subscribe(
            response=>{
                /////загрузка спринтов
            }
        )
    }
    newtask() {
        console.log(this.model);
        this.taskService.create(this.model,parseInt(this.model.project.toLocaleString()),
            new Date(this.model.start).getTime(),
            new Date(this.model.finish).getTime()).subscribe(
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
    getAllSprint() {
        return this.sprintService.getAll();
    }
}