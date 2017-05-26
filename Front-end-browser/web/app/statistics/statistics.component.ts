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
    options: Object;
    vena: Object;
    constructor(private taskService: TaskService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router ) {

        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.task = new Task();
        this.id=JSON.parse(localStorage.getItem('token')).developer_id;
        this.options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: 'white'
                    }
                }
            },
            series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                data: [2, 2, 3, 2, 1], color: 'red'
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5]
            }]
        };

    }

    ngOnInit() {

        this.fill();
    }

    fill(){
        this.model.start="2017-05-02";
        console.log(this.model.start);
        this.loadByDate();
        console.log(this.model.start);
    }
    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }


    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['2006', '2007'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        {data: [65, 59], label: 'Expected time'},
        {data: [28, 48], label: 'Real time'}
    ];

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public loadByDate(): void {
        let tasks:Task[];
        let first=[];
        let second=[];
        this.barChartLabels=[];
        this.taskService.getByDeveloperAndStart(this.id,new Date(this.model.start).getTime()).subscribe(
            response=>{
                tasks=response;
                console.log(tasks);
                for(let i=0;i<tasks.length;i++){
                    this.barChartLabels.push(tasks[i].title);
                    first.push((tasks[i].deadline-tasks[i].dateStart)/3600000);
                    second.push(parseInt(tasks[i].duration+""));
                }
                let clone = JSON.parse(JSON.stringify(this.barChartData));
                clone[0].data = first;
                clone[1].data = second;
                this.barChartData = clone;
                console.log(this.barChartLabels);
                console.log(this.barChartData);
            }
        )
    }

}
