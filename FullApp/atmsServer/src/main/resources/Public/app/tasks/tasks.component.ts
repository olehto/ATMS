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
    id: number;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router ) {
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
            (response)=> {
                this.task=response;
            }
        );
        this.getAllDevelopers().subscribe(
            (response)=> {
                    this.developers = response;
                }
                );
    }
    getTask(id: number){
        return this.taskService.getById(this.id);
    }
    getAllDevelopers(){
        return this.userService.getAll();
    }

}