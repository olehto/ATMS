/**
 * Created by EvSpirit on 24.03.2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Type } from '../_models/index';
import {Sprint} from "../_models/sprint";

@Injectable()
export class SprintService {
    httpAdress: string;
    constructor(private http: Http) {
        this.httpAdress= 'http://localhost:8080';
    }

    getAll() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/sprint',{headers: headers}).map((response: Response) => response.json());
    }

    getById(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/sprint/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    createSprint(sprint:Sprint){
        let id=sprint.project.toLocaleString();
        sprint.project=undefined;
        const body = JSON.stringify(sprint);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.post(this.httpAdress+'/api/sprint/add/'+id,body, { headers: headers }).map((response: Response) => response.json());
    }

    updateSprint(sprint:Sprint){
        let id=sprint.project.toLocaleString();
        sprint.project=undefined;
        const body = JSON.stringify(sprint);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.put(this.httpAdress+'/api/sprint/'+sprint.sprintId+'/upd/'+id,body, { headers: headers }).map((response: Response) => response.json());
    }
}