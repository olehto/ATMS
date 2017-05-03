/**
 * Created by Lenovo on 28.03.2017.
 */
/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import {TaskService} from '../_services/task.service';
import { TypeService } from '../_services/type.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../_models/task";
import {Subscription} from "rxjs";
import {isUndefined} from "util";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {Token} from "../_models/token";
import {Type} from "../_models/type";
import {Priority} from "../_models/priority";
import {Status} from "../_models/status";


@Component({
    moduleId: module.id,
    selector: 'tasks',
    styleUrls: ['tasks.component.css'],
    templateUrl: 'tasks.component.html'
})
export class TasksComponent implements OnInit {
    model: any = {};
    task: Task;
    tasks: Task[];
    developers: User [] = [];
    nickname: string;
    id: number;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
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
        if(this.id===undefined) {
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        }
        this.fill();

    }

    fill(){

        this.getTask(this.id).subscribe(
            (response) =>{
                this.task=response;
                console.log(response);
                this.getDeveloper(parseInt(this.task.developer.toLocaleString())).subscribe(
                    response=>{
                        console.log(response);
                        this.task.developer=response;
                    }
                );
                let types:Type[]=JSON.parse(sessionStorage.getItem('types'));
                for(let i=0;i<types.length;i++){
                    if(types[i].typeId==parseInt(this.task.type.toLocaleString())){
                        this.task.type=types[i];
                    }
                }
                let priorities:Priority[]=JSON.parse(sessionStorage.getItem('priorities'));
                for(let i=0;i<priorities.length;i++){
                    if(priorities[i].priorityId==parseInt(this.task.priority.toLocaleString())){
                        this.task.priority=priorities[i];
                    }
                }
                let statuses:Status[]=JSON.parse(sessionStorage.getItem('statuses'));
                for(let i=0;i<statuses.length;i++){
                    if(statuses[i].statusId==parseInt(this.task.status.toLocaleString())){
                        this.task.status=statuses[i];
                    }
                }

            }
        );

    }

    getDeveloper(id:number){
        return this.userService.getById(id);
    }
    getTask(id: number){
        return this.taskService.getById(this.id);
    }
    getAllDevelopers(){
        return this.userService.getAll();
    }
    getAllTasks(){
        return this.taskService.getAll();
    }
    inputIdDev(id: number) {
        let token: Token = JSON.parse(localStorage.getItem('token'));
        console.log(token);
        this.taskService.take(this.task.taskId.toLocaleString(),token.developer_id).subscribe(
            response=>{
                console.log(response);
                this.task=response;
            }
        );

    }
}