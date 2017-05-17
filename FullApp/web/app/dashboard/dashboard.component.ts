/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Task} from "../_models/task";
import {TaskService} from "../_services/task.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../_services/user.service";
import {Project} from "../_models/project";
import {ProjectService} from "../_services/project.service";
import {Priority} from "../_models/priority";
import {Sprint} from "../_models/sprint";
import {SprintService} from "../_services/sprint.service";

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {
    model: any = {};
    task: Task;
    tasks: Task [];
    nickname: string;
    projectsByDevelopers: Project[];
    projects: Project [];
    byDevelopers: Task [];
    id: number;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private projectService: ProjectService,
                private sprintService: SprintService,
                private route: ActivatedRoute,
                private router: Router) {
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.task = new Task();
        this.id = JSON.parse(localStorage.getItem('token')).developer_id;

    }

    ngOnInit() {
        if (this.id === undefined) {
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        }
        this.fill();

    }

    fill() {
        this.getTask(this.id).subscribe(
            (response) => {
                this.task = response;
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
        this.getAllProjectsByDeveloper(this.id).subscribe(
            (response) => {
                this.projectsByDevelopers = response;
                console.log(response);
            }
        );
        this.getByDeveloper(this.id).subscribe(
            (response) => {
                this.byDevelopers = response;
                console.log(this.byDevelopers);
                let priorities: Priority[] = JSON.parse(sessionStorage.getItem('priorities'));
                //let projects: Project[] = [];

                let sprints: Sprint[] = [];
                this.sprintService.getAll().subscribe(
                    response => {
                        sprints = response;
                        console.log(sprints);
                        this.projectService.getAll().subscribe(
                            response => {
                                this.projects = response;
                                for (let j = 0; j < sprints.length; j++) {
                                    for (let i = 0; i < this.projects.length; i++) {
                                        if (parseInt(sprints[j].project.toLocaleString()) == this.projects[i].projectId) {
                                            sprints[j].project = this.projects[i];
                                        }
                                    }
                                }
                                console.log(sprints);
                                for (let j = 0; j < this.byDevelopers.length; j++) {
                                    for (let i = 0; i < priorities.length; i++) {
                                        if (priorities[i].priorityId == parseInt(this.byDevelopers[j].priority.toLocaleString())) {
                                            this.byDevelopers[j].priority = priorities[i];
                                        }
                                    }
                                    for (let i = 0; i < sprints.length; i++) {
                                        if (this.byDevelopers[j].sprint.toLocaleString() == sprints[i].sprintId.toLocaleString()) {
                                            this.byDevelopers[j].sprint = sprints[i];
                                        }
                                    }

                                }
                                console.log(this.byDevelopers);
                                //console.log(projects);
                            }
                        );
                    }
                );


            }
        );
    }

    getTask(id: number) {
        return this.taskService.getById(id);
    }

    getAllTasks() {
        return this.taskService.getAll();
    }

    getAllProjects() {
        return this.projectService.getAll();
    }

    getDeveloper(id: number) {
        return this.userService.getById(id);
    }

    getAllProjectsByDeveloper(id: number) {
        return this.projectService.getByDeveloper(id);
    }

    getByDeveloper(id: number) {
        return this.taskService.getByDeveloper(this.id);
    }

}
