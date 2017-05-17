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

@Component({
    moduleId: module.id,
    selector: 'edit-project',
    templateUrl: 'edit_project.component.html'
})

export class EditProjectComponent implements OnInit {
    model: any = {};
    projects: Project[];
    nickname:string;
    id: number;
    private querySubscription: Subscription;
    constructor(private projectService: ProjectService,
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
        this.projectService.update(this.model).subscribe(
            response=>{
                console.log(response);
                this.router.navigate(['/projects_list']);
            }
        )
    }
    fill(){
        this.getAllProjects().subscribe(
            (response)=>{
                this.projects=response;
            }
        );
        this.projectService.getById(this.id).subscribe(
            response=>{
                console.log(response);
                this.model.projectId=response.projectId;
                this.model.description=response.description;
                this.model.title=response.title;
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
                temp=new Date(response.deadline);
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
                this.model.deadline=date;
            }
        )
    }

    getDeveloper(id:number){
        return this.userService.getById(this.id);
    }
    getAllProjects(){
        return this.projectService.getAll();
    }
}
