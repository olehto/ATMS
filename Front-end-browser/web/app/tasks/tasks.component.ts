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
import {Token} from "../_models/token";
import {Type} from "../_models/type";
import {Priority} from "../_models/priority";
import {Status} from "../_models/status";


@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.component.html'
})
export class TasksComponent implements OnInit {
    selectedText: string = '';
    model: any = {};
    task: Task;
    tasks: Task[];
    developers: User [] = [];
    nickname: string;
    id: number;
    private querySubscription: Subscription;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router ) {
        this.nickname=JSON.parse(localStorage.getItem('token')).nickname;
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
   lightSelection() {
    let userSelection = window.getSelection();
    for(let i = 0; i < userSelection.rangeCount; i++) { // получаем местоположение выделеного текста
        this.highlight(userSelection.getRangeAt(i));
    }
}

   highlight(range) {
    let newNode = document.createElement("span");
    newNode.setAttribute(
        "style",
        "background-color: yellow; display: inline;"
    );
    range.surroundContents(newNode);
}
    showSelectedText(oField) {
        let text = this.task.description.toString();

        if (window.getSelection) {
            text = window.getSelection().toString();


        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;

        }
        this.selectedText = text;
        console.log(text);
    }
    fill(){

        this.getTask(this.id).subscribe(
            (response) =>{
                this.task=response;
                this.keywords();
                console.log(response);
                this.getDeveloper(parseInt(this.task.developer.toLocaleString())).subscribe(
                    response=>{
                        console.log(response);
                        this.task.developer=response;
                    }
                );
                let types:Type[]=JSON.parse(sessionStorage.getItem('types'));
                for(let i=0;i<types.length;i++){
                    if(types[i].typeId==parseInt(this.task.type.toLocaleString())){
                        this.task.type=types[i];
                    }
                }
                let priorities:Priority[]=JSON.parse(sessionStorage.getItem('priorities'));
                for(let i=0;i<priorities.length;i++){
                    if(priorities[i].priorityId==parseInt(this.task.priority.toLocaleString())){
                        this.task.priority=priorities[i];
                    }
                }
                let statuses:Status[]=JSON.parse(sessionStorage.getItem('statuses'));
                for(let i=0;i<statuses.length;i++){
                    if(statuses[i].statusId==parseInt(this.task.status.toLocaleString())){
                        this.task.status=statuses[i];
                    }
                }

            }
        );

    }
    keywords(){
        let div2 = document.getElementById("keywords");

        let arr = this.task.description.split(" ");
        div2.innerHTML = "";

        for(let i = 0; i < arr.length; i++)
        {
            let span = document.createElement("span");
            span.innerText = arr[i];
            span.addEventListener("click", function() {
                alert(this.innerText);
                console.log(this.innerText);
            });

            div2.appendChild(span);
            div2.appendChild(document.createTextNode(" "));
            console.log("llll")
        }

    }
    getDeveloper(id:number){
        return this.userService.getById(id);
    }
    getTask(id: number){
        return this.taskService.getById(this.id);
    }
    getAllDevelopers(){
        return this.userService.getAll();
    }
    getAllTasks(){
        return this.taskService.getAll();
    }
    inputIdDev(id: number) {
        let token: Token = JSON.parse(localStorage.getItem('token'));
        console.log(token);
        this.taskService.take(this.task.taskId.toLocaleString(),token.developer_id).subscribe(
            response=>{
                console.log(response);
                this.task=response;
            }
        );

    }
}