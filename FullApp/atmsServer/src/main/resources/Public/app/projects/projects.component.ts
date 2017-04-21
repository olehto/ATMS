/**
 * Created by Lenovo on 26.03.2017.
 */

import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from "rxjs";
import {TaskService} from "../_services/task.service";

@Component ({
    moduleId: module.id,
    selector: 'projects',
    styleUrls:['projects.component.css'],
    templateUrl: 'projects.component.html',
})

export class ProjectsComponent  implements OnInit {
    condition: boolean=true;
    token: boolean = true;
    token2: boolean = true;
    id: number;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['id'];
            }
        );
    }
    ngOnInit() {
        if(this.id===undefined){
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
            this.router.navigate([returnUrl]);
        }
    }
    toggle(){
        this.condition=!this.condition;
    }
    hidden(){
        this.token = !this.token;
    }
    hidden2(){
        this.token2 = !this.token2;
    }
}
