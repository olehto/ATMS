import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';

import { Task } from '../_models/index';
import {TypeService} from "./type.service";
import {StatusService} from "./status.service";
import {PriorityService} from "./priority.service";
import {UserService} from "./user.service";

@Injectable()
export class TaskService {
    httpAdress: string;
    constructor(private http: Http) {
        this.httpAdress= 'http://localhost:8080';
    }
    //getByEpicTask, getByStatus

    getById(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/task/' + id,{headers: headers}).map((response: Response) => response.json());
    }
    getAll() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/task',{headers: headers}).map((response: Response) => response.json());
    }
    create(task: Task,project:number,start:number,finish:number) {
        //const body = JSON.stringify(task);
        //console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        let params: URLSearchParams = new URLSearchParams();
        params.set('title', task.title );
        params.set('description', task.description );
        params.set('dateStart',start+"");
        params.set('deadline',finish+"");
        params.set('duration',task.duration.toLocaleString());
        params.set('version',"1.0.0");
        params.set('type',task.type.toLocaleString());
        params.set('developer',task.developer.toLocaleString());
        params.set('priority',task.priority.toLocaleString());
        params.set('status',task.status.toLocaleString());
        params.set('reporter',JSON.parse(localStorage.getItem('token')).developer_id);
        params.set('project',project.toLocaleString());
        return this.http.post(this.httpAdress+'/api/task', params.toString(), { headers: headers }).map((response: Response) => response.json());
    }

    update(task: Task,project:number,start:number,finish:number) {
        /*const body = JSON.stringify(task);
         console.log(body);
         let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
         return this.http.post(this.httpAdress+'/api/task/' + task.taskId, body,{headers: headers}).map((response: Response) => response.json());*/
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        let params: URLSearchParams = new URLSearchParams();
        params.set('title', task.title );
        params.set('description', task.description );
        params.set('dateStart',start+"");
        params.set('deadline',finish+"");
        params.set('duration',task.duration.toLocaleString());
        params.set('version',"1.0.0");
        params.set('type',task.type.toLocaleString());
        params.set('developer',task.developer.toLocaleString());
        params.set('priority',task.priority.toLocaleString());
        params.set('status',task.status.toLocaleString());
        params.set('reporter',JSON.parse(localStorage.getItem('token')).developer_id);
        params.set('project',project.toLocaleString());
        return this.http.post(this.httpAdress+'/api/task/'+task.taskId, params.toString(), { headers: headers }).map((response: Response) => response.json());

    }

    delete(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.delete(this.httpAdress+'/api/task/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByPriority(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return  this.http.get(this.httpAdress+'/api/task/priority/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByType(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return  this.http.get(this.httpAdress+'/api/task/type/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByStatus(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return  this.http.get(this.httpAdress+'/api/task/status/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByProject(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return  this.http.get(this.httpAdress+'/api/task/project/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByParent(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return  this.http.get(this.httpAdress+'/api/task/epic/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByDeveloper(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress + '/api/task/developer/' + id, {headers: headers}).map((response: Response) => response.json());
    }

    searchByTitle(title:string){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        let params: URLSearchParams = new URLSearchParams();
        params.set('title', title );
        return this.http.post(this.httpAdress + '/api/task/search/title',params.toString(), {headers: headers}).map((response: Response) => response.json());

    }
    take(taskId:string,devId:string){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        let params: URLSearchParams = new URLSearchParams();
        params.set('developerId', devId );
        params.set('taskId',taskId);
        return this.http.post(this.httpAdress + '/api/task/take',params.toString(), {headers: headers}).map((response: Response) => response.json());

    }

}