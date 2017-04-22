/**
 * Created by Lenovo on 28.03.2017.
 */
/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TaskService} from "../_services/task.service";
import {Task} from "../_models/task";
import {Priority} from "../_models/priority";
import {Subscription} from "rxjs";
import {isUndefined} from "util";



@Component({
    moduleId: module.id,
    selector: 'tasks',
    styleUrls: ['tasks.component.css'],
    templateUrl: 'tasks.component.html'
})
export class TasksComponent implements OnInit {
    model: any = {};
    task: Task;
    priority: Priority;
    id: number;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.task=new Task();
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['id'];
            }
        );
    }

    ngOnInit() {
        if(this.id===undefined){
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        }
        this.fill();
    }
    print(){
        this.fill();
        console.log(this.task);

    }
    fill(){
        this.getTask(this.id).subscribe(
            (response)=> {
                this.task=response;
            }
        );
    }
    getTask(id: number){
        return this.taskService.getById(id);
    }
}