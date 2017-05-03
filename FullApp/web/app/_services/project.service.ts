/**
 * Created by EvSpirit on 22.03.2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Project } from '../_models/index';
import {Sprint} from "../_models/sprint";

@Injectable()
export class ProjectService {
    httpAdress: string;
    constructor(private http: Http) {
        this.httpAdress= 'http://localhost:8080';
    }

    getAll() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/project/',{headers: headers}).map((response: Response) => response.json());
    }

    getById(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/project/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    create(project: Project) {
        const body = JSON.stringify(project);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.post(this.httpAdress+'/api/project',body, { headers: headers }).map((response: Response) => response.json());
    }

    getByDeveloper(id: number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return  this.http.get(this.httpAdress+'/api/project/developer/' + id,{headers: headers}).map((response: Response) => response.json());
    }
    update(project: Project) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.put(this.httpAdress+'/api/project/' + project.projectId, project,{headers: headers}).map((response: Response) => response.json());
    }

    delete(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.delete(this.httpAdress+'/api/project/' + id,{headers: headers}).map((response: Response) => response.statusText/*response.json()*/);
    }
    createSprint(sprint:Sprint){
        const body = JSON.stringify(sprint);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.post(this.httpAdress+'/api/sprint',body, { headers: headers }).map((response: Response) => response.json());


    }
}