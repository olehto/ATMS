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
                type: 'column',
                plotBorderWidth: 1,
                zoomType: 'xy'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['Harin', 'Kazanovkiy', 'Vasilenko', 'Shmelev', 'Serpent']
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
                name: 'Suisselle',
                data: [0.2, 0.4, 0.32, 0.7, 0.22], color: 'red'
            },
                {
                name: 'ATMS',
                data: [0.2, 0.5, 0.36, 0.72, 0.1], color: 'yellow'
            },
                {
                    name: 'horario',
                    data: [0.2, 0.4, 0.7, 0.21, 0.31]
                },
                {
                    name: 'devun',
                    data: [0.2, 0.7, 0.3, 0.12, 0.55], color: 'green'
                },
                {
                name: 'java',
                data: [0.2, 0.2, 0.3, 0.7, 0.1]
            },
                {
                    name: 'angular2',
                    data: [0.2, 0.1, 0.32, 0.77, 0.55]
                },

                {
                    name: 'android',
                    data: [0.2, 0.4, 0.3, 0.7, 0.9]
                }
                ]
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
    public radarChartLabels:string[] = ['Horarrio', 'Atms', 'java', 'andriod', 'angular2', 'devun', 'php'];

    public radarChartData:any = [
        {data: [18, 88, 20, 29, 10, 27, 20], color: 'red', label: 'ATMS'},
        {data: [28, 48, 40, 19, 96, 27, 100], color: 'blue', label: 'Horarrio'},
        {data: [78, 28, 40, 29, 16, 27, 20], color: 'green', label: 'Suisselle'},
        {data: [38, 28, 60, 49, 36,37, 60], color: 'green', label: 'devun'}
    ];

    public radarChartType:string = 'radar';

    // events


    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['2006', '2007'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        {data: [65, 59], label: 'Expected time'},
        {data: [28, 48], label: 'Real time'},

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
