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
        return this.http.get(this.httpAdress+'/api/task/' + id).map((response: Response) => response.json());
    }

    create(task: Task) {
        const body = JSON.stringify(task);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.httpAdress+'/api/task/',body, { headers: headers }).map((response: Response) => response.json());
    }

    update(task: Task) {
        return this.http.put(this.httpAdress+'/api/task/' + task, task).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.httpAdress+'/api/task/' + id).map((response: Response) => response.json());
    }

    getByPriority(id: number){
        return  this.http.get(this.httpAdress+'/api/task/priority/' + id).map((response: Response) => response.json());
    }

    getByType(id: number){
        return  this.http.get(this.httpAdress+'/api/task/type/' + id).map((response: Response) => response.json());
    }

    getByProject(id: number){
        return  this.http.get(this.httpAdress+'/api/task/project/' + id).map((response: Response) => response.json());
    }


    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}