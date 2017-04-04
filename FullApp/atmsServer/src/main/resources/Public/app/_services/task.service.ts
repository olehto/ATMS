/**
 * Created by EvSpirit on 24.03.2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Task } from '../_models/index';

@Injectable()
export class TaskService {
    httpAdress: string;
    constructor(private http: Http) {
        this.httpAdress= 'http://localhost:8080';
    }
    //getByEpicTask, getByStatus

    getById(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.get(this.httpAdress+'/api/task/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    create(task: Task) {
        const body = JSON.stringify(task);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.post(this.httpAdress+'/api/task/',body, { headers: headers }).map((response: Response) => response.json());
    }

    update(task: Task) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.put(this.httpAdress+'/api/task/' + task.taskId, task,{headers: headers}).map((response: Response) => response.json());
    }

    delete(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.delete(this.httpAdress+'/api/task/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByPriority(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return  this.http.get(this.httpAdress+'/api/task/priority/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByType(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return  this.http.get(this.httpAdress+'/api/task/type/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByStatus(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return  this.http.get(this.httpAdress+'/api/task/status/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByProject(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return  this.http.get(this.httpAdress+'/api/task/project/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getByParent(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return  this.http.get(this.httpAdress+'/api/task/epic/' + id,{headers: headers}).map((response: Response) => response.json());
    }

}