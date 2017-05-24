/**
 * Created by Hedy on 03.05.2017.
 */

import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TaskService} from "../_services/task.service";
import {UserService} from "../_services/user.service";
import {ProjectService} from "../_services/project.service";
import {Subscription} from "rxjs/Subscription";
import {User} from "../_models/user";
import {Task} from "../_models/task";
import {Project} from "../_models/project";
import {SprintService} from "../_services/sprint.service";
import {Sprint} from "../_models/sprint";

@Component({
    moduleId: module.id,
    selector: 'edit-sprint',
    templateUrl: 'edit_sprint.component.html'
})

export class EditSprintComponent implements OnInit {
    model: any = {};
    projects: Project[];
    sprints: Sprint [];
    nickname:string;
    id: number;
    private querySubscription: Subscription;
    constructor(private sprintService: SprintService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router){
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['id'];
            }
        );
    }
    ngOnInit() {
        this.fill();

    }
    update(){
        this.sprintService.updateSprint(this.model).subscribe(
            response=>{
                console.log(response);
                this.router.navigate(['/projects_list']);
            }
        )
    }
    fill(){
        this.getAllSprint().subscribe(
            (response)=>{
                this.sprints=response;
            }
        );
        this.sprintService.getById(this.id).subscribe(
            response=>{
                console.log(response);
                this.model.sprintId=response.sprintId;
                this.model.project=response.sprint.project.title;
                let temp=new Date(response.dateStart);
                let date=temp.getFullYear()+"-";
                if(temp.getMonth().toString().length===1){
                    date+="0"+temp.getMonth()+"-";
                }
                else{
                    date+=temp.getMonth()+"-";
                }
                if(temp.getDay().toString().length===1){
                    date+="0"+temp.getDay();
                }
                else{
                    date+=temp.getDay();
                }
                console.log(date);
                this.model.dateStart=date;
                temp=new Date(response.dateEnd);
                date=temp.getFullYear()+"-";
                if(temp.getMonth().toString().length===1){
                    date+="0"+temp.getMonth()+"-";
                }
                else{
                    date+=temp.getMonth()+"-";
                }
                if(temp.getDay().toString().length===1){
                    date+="0"+temp.getDay();
                }
                else{
                    date+=temp.getDay();
                }
                this.model.dateEnd=date;
            }
        )
    }

    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }
    getAllSprint(){
        return this.sprintService.getAll();
    }
}
