/**
 * Created by Lenovo on 02.04.2017.
 */

import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TaskService} from "../_services/task.service";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    styleUrls: ['developers.component.css'],
    selector: 'developers',
    templateUrl: 'developers.component.html'
})

export class DevelopersComponent  implements OnInit {
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
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        }
    }
}
