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
import {KeywordService} from "../_services/keyword.service";
import {SprintService} from "../_services/sprint.service";

@Component({
    moduleId: module.id,
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
    sprints: Sprint[];
    statuses: Status[];
    nickname:string;
    task: Task;
    tempTask:Task;
    id: number;
    test: number = 5;
    minValue: number = 1;
    maxValue: number = 10;
    selectedText: string = '';
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private projectService: ProjectService,
                private keywordService: KeywordService,
                private typeService: TypeService,
                private sprintService: SprintService,
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
    lightSelection() {
        let userSelection = window.getSelection();
        for(let i = 0; i < userSelection.rangeCount; i++) { // получаем местоположение выделеного текста
            this.highlight(userSelection.getRangeAt(i));
        }
    }


    highlight(range) {
        let newNode = document.createElement("span");
        newNode.setAttribute(
            "style",
            "background-color: yellow; display: inline;"
        );
        range.surroundContents(newNode);
    }
        onSelect(e) {
            this.selectedText = e;
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
        this.getAllSprint().subscribe(
            (response) => {
                this.sprints = response;
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
                let temp=new Date(response.dateStart);
                let date=temp.getFullYear()+"-";
                if(temp.getMonth().toString().length===1){
                    date+="0"+temp.getMonth()+"-";
                }
                else{
                    date+=temp.getMonth()+"-";
                }
                if(temp.getDay().toString().length===1){
                    date+="0"+temp.getDay();
                }
                else{
                    date+=temp.getDay();
                }
                console.log(date);
                this.model.start=date;
                temp=new Date(response.deadline);
                date=temp.getFullYear()+"-";
                if(temp.getMonth().toString().length===1){
                    date+="0"+temp.getMonth()+"-";
                }
                else{
                    date+=temp.getMonth()+"-";
                }
                if(temp.getDay().toString().length===1){
                    date+="0"+temp.getDay();
                }
                else{
                    date+=temp.getDay();
                }
                this.model.finish=date;
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
                this.model.project=response.projects.title;
                this.model.developer=JSON.parse(localStorage.getItem('token')).developer_id;
                console.log(this.model);
            }
        )
    }
    keywords(){
        this.keywordService.add(this.selectedText,this.id,0.5).subscribe(
            response=>{
                console.log(response);
            }
        )
    }
    sprint_load(){

    }

    update(){
        console.log(this.model);
        this.taskService.update(this.model,parseInt(this.model.project.toLocaleString()),
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
    getAllSprint() {
        return this.sprintService.getAll();
    }

    getAllProjects() {
        return this.projectService.getAll();
    }
}