/**
 * Created by Lenovo on 05.04.2017.
 */
import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TaskService} from "../_services/task.service";
import {Subscription} from "rxjs/Subscription";
import {User} from "../_models/user";
import {Task} from "../_models/task";
import {UserService} from "../_services/user.service";

@Component ({
    moduleId: module.id,
    selector: 'statistics',
    styleUrls: ['statistics.component.css'],
    templateUrl: 'statistics.component.html'
})

export class StatisticsComponent {
    model: any = {};
    task: Task;
    tasks: Task [];
    id: number;
    nickname:string;
    condition: boolean;

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

    }
    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        let data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
    }
}
