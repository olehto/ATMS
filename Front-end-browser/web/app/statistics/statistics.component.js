"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Lenovo on 05.04.2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var task_service_1 = require("../_services/task.service");
var task_1 = require("../_models/task");
var user_service_1 = require("../_services/user.service");
var StatisticsComponent = (function () {
    function StatisticsComponent(taskService, userService, route, router) {
        this.taskService = taskService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.model = {};
        this.radarChartLabels = ['Horarrio', 'Atms', 'java', 'andriod', 'angular2', 'devun', 'php'];
        this.radarChartData = [
            { data: [18, 88, 20, 29, 10, 27, 20], color: 'red', label: 'ATMS' },
            { data: [28, 48, 40, 19, 96, 27, 100], color: 'blue', label: 'Horarrio' },
            { data: [78, 28, 40, 29, 16, 27, 20], color: 'green', label: 'Suisselle' },
            { data: [38, 28, 60, 49, 36, 37, 60], color: 'green', label: 'devun' }
        ];
        this.radarChartType = 'radar';
        // events
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['2006', '2007'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59], label: 'Expected time' },
            { data: [28, 48], label: 'Real time' },
        ];
        this.nickname = JSON.parse(localStorage.getItem('token')).nickname;
        this.task = new task_1.Task();
        this.id = JSON.parse(localStorage.getItem('token')).developer_id;
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
    StatisticsComponent.prototype.ngOnInit = function () {
        this.fill();
    };
    StatisticsComponent.prototype.fill = function () {
        this.model.start = "2017-05-02";
        console.log(this.model.start);
        this.loadByDate();
        console.log(this.model.start);
    };
    StatisticsComponent.prototype.getDeveloper = function (id) {
        return this.userService.getById(this.id);
    };
    // events
    StatisticsComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    StatisticsComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    StatisticsComponent.prototype.loadByDate = function () {
        var _this = this;
        var tasks;
        var first = [];
        var second = [];
        this.barChartLabels = [];
        this.taskService.getByDeveloperAndStart(this.id, new Date(this.model.start).getTime()).subscribe(function (response) {
            tasks = response;
            console.log(tasks);
            for (var i = 0; i < tasks.length; i++) {
                _this.barChartLabels.push(tasks[i].title);
                first.push((tasks[i].deadline - tasks[i].dateStart) / 3600000);
                second.push(parseInt(tasks[i].duration + ""));
            }
            var clone = JSON.parse(JSON.stringify(_this.barChartData));
            clone[0].data = first;
            clone[1].data = second;
            _this.barChartData = clone;
            console.log(_this.barChartLabels);
            console.log(_this.barChartData);
        });
    };
    return StatisticsComponent;
}());
StatisticsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'statistics',
        styleUrls: ['statistics.component.css'],
        templateUrl: 'statistics.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router])
], StatisticsComponent);
exports.StatisticsComponent = StatisticsComponent;
//# sourceMappingURL=statistics.component.js.map