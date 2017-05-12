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
    statuses: Status[];
    nickname:string;
    tempTask:Task;
    id: number;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private projectService: ProjectService,
                private typeService: TypeService,
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

    newtask() {
        console.log(this.model);
        this.taskService.create(this.model,parseInt(this.model.project.toLocaleString()),this.model.start,this.model.finish).subscribe(
            response=>{
                console.log(response);
                this.router.navigate(['/tasks_list']);
            }
        );
        /*let task: Task = new Task();
        task.title = this.model.title;
        task.description = this.model.description;
        task.dateStart = this.model.start;
        task.deadline = this.model.finish;
        task.version = "1.0.0";
        task.duration = this.model.duration;*/

        /*this.taskService.create(task).subscribe(
            response=>{
                console.log(response);
                let temp=response;
                this.typeService.getById(parseInt(this.model.type.toLocaleString())).subscribe(
                    response => {
                        let project: Project;
                        temp.type = response;
                        this.statusService.getById(parseInt(this.model.status.toLocaleString())).subscribe(
                            response => {
                                console.log(response);
                                temp.status = response;
                                this.priorityService.getById(parseInt(this.model.priority.toLocaleString())).subscribe(
                                    response => {
                                        console.log(response);
                                        temp.priority = response;
                                        this.projectService.getById(parseInt(this.model.project.toLocaleString())).subscribe(
                                            response => {
                                                console.log(response);
                                                let project: Project = response;
                                                let sprint: Sprint = new Sprint();
                                                sprint.project = project;
                                                sprint.dateEnd = project.dateStart;
                                                sprint.dateStart = project.deadline;
                                                this.projectService.createSprint(sprint).subscribe(
                                                    response => {
                                                        console.log(response);
                                                        temp.sprint = response;
                                                        this.taskService.create(temp).subscribe(
                                                            response => {
                                                                console.log(response);
                                                            }
                                                        )
                                                    }
                                                )
                                            }
                                        )

                                    })
                            })
                    })
            }
        );*/
        /*this.model.status=parseInt(this.model.status);
        task.status = this.model.status;
        this.model.developer=parseInt(this.model.developer);
        task.developer=this.model.developer;
        this.model.type=parseInt(this.model.type);
        task.type = this.model.type;
        this.model.priority=parseInt(this.model.priority);
        task.priority=this.model.priority;
        this.tempTask=task;
        console.log(this.tempTask);*/
        /*this.typeService.getById(parseInt(this.tempTask.type.toLocaleString())).subscribe(
            response => {
                let project: Project;
                this.tempTask.type = response;
                this.statusService.getById(parseInt(this.tempTask.status.toLocaleString())).subscribe(
                    response => {
                        this.tempTask.status = response;
                        this.priorityService.getById(parseInt(this.tempTask.priority.toLocaleString())).subscribe(
                            response => {
                                this.tempTask.priority = response;
                                this.userService.getById(parseInt(this.tempTask.developer.toLocaleString())).subscribe(
                                 response => {
                                 this.tempTask.developer = response;
                                 this.userService.getDevType(parseInt(this.tempTask.developer.devType.toLocaleString())).subscribe(
                                 response => {
                                 this.tempTask.developer.devType = response;*/
                                /*this.projectService.getById(parseInt(this.model.project.toLocaleString())).subscribe(
                                    response => {
                                        let project:Project = response;
                                        let sprint: Sprint = new Sprint();
                                        sprint.project = project;
                                        sprint.dateEnd = project.dateStart;
                                        sprint.dateStart = project.deadline;
                                        this.projectService.createSprint(sprint).subscribe(
                                            response => {
                                                this.tempTask.sprint=response;
                                                this.taskService.create(this.tempTask).subscribe(
                                                    response=>{
                                                        console.log(response);
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )*/

                                /*})
                                 })
                            })
                    })
            })*/

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