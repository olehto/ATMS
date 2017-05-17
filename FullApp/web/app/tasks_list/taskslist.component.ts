
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
import {UserService} from "../_services/user.service";
import {Status} from "../_models/status";

@Component ({
    moduleId: module.id,
    selector: 'tasks-list',
    templateUrl: 'taskslist.component.html',
})

export class TasksListComponent implements OnInit{
    model: any = {};
    task: Task;
    tasks: Task [];
    id: number;
    nickname:string;
    condition: boolean;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.task = new Task();
        this.id=JSON.parse(localStorage.getItem('token')).developer_id;
    }

    ngOnInit() {

        this.fill();
    }

    fill(){
        this.getAllTasks().subscribe(
            (response)=>{
                this.tasks=response;
                for(let j=0;j<this.tasks.length;j++){
                    let types:Type[]=JSON.parse(sessionStorage.getItem('types'));
                    for(let i=0;i<types.length;i++){
                        if(types[i].typeId==parseInt(this.tasks[j].type.toLocaleString())){
                            this.tasks[j].type=types[i];
                        }
                    }
                    let statuses:Status[]=JSON.parse(sessionStorage.getItem('statuses'));
                    console.log(statuses);
                    for(let i=0;i<statuses.length;i++){
                        if(statuses[i].statusId==parseInt(this.tasks[j].status.toLocaleString())){
                            this.tasks[j].status=statuses[i];
                        }
                    }

                }
            }
        );
    }
    search(){
        console.log("Search");
        console.log(this.model.title);
        this.taskService.searchByTitle(this.model.title).subscribe(
            (response)=>{
                this.tasks=response;
                for(let j=0;j<this.tasks.length;j++){
                    let types:Type[]=JSON.parse(sessionStorage.getItem('types'));
                    for(let i=0;i<types.length;i++){
                        if(types[i].typeId==parseInt(this.tasks[j].type.toLocaleString())){
                            this.tasks[j].type=types[i];
                        }
                    }
                    let statuses:Status[]=JSON.parse(sessionStorage.getItem('statuses'));
                    console.log(statuses);
                    for(let i=0;i<statuses.length;i++){
                        if(statuses[i].statusId==parseInt(this.tasks[j].status.toLocaleString())){
                            this.tasks[j].status=statuses[i];
                        }
                    }

                }
            }
        );
    }
    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }
    getAllTasks(){
        return this.taskService.getAll();
    }
    hidden(){
        this.condition = !this.condition;
    }
}
