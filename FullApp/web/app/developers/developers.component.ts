/**
 * Created by Lenovo on 02.04.2017.
 */

import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from "../_models/user";
import {Task} from "../_models/task";
import {UserService} from "../_services/user.service";
import {TaskService} from "../_services/task.service";
import {Subscription} from "rxjs/Subscription";
@Component({
    moduleId: module.id,
    selector: 'developers',
    templateUrl: 'developers.component.html'
})

export class DevelopersComponent implements OnInit {
    model: any = {};
    tasks: Task[];
    developers: User [];
    user: User;
    nickname:string;
    id: number;
    condition: boolean;
    private querySubscription: Subscription;

    constructor(private userService: UserService,
                private taskService: TaskService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.user = new User();
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['id'];
            }
        );
    }

    ngOnInit() {
        if(this.id===undefined) {
            this.id=JSON.parse(localStorage.getItem('token')).developer_id;
            /*let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);*/
        }
        this.fill();

    }
    toggle(){
        this.condition=!this.condition;
    }
    fill(){
        this.getUser(this.id).subscribe(
            (response)=> {
                this.user=response;
                console.log(response);
            }
        );
        this.getAllTasks().subscribe(
            (response)=>{
                this.tasks=response;
                console.log(response);
            }
        );
        this.getAllDevelopers().subscribe(
            (response)=> {
                this.developers = response;
            }
        );
        this.getDeveloper(this.id).subscribe(
            (response)=>{
                this.user=response;
            }
        );
    }
    getUser(id: number){
        return this.userService.getById(this.id);
    }
    getAllTasks(){
        return this.taskService.getAll();
    }
    getAllDevelopers(){
        return this.userService.getAll();
    }
    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }
}