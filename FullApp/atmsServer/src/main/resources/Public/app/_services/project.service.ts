/**
 * Created by EvSpirit on 22.03.2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Project } from '../_models/index';

@Injectable()
export class ProjectService {
    httpAdress: string;
    constructor(private http: Http) {
        this.httpAdress= 'http://localhost:8080';
    }

    getAll() {
        return this.http.get(this.httpAdress+'/api/project/').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.httpAdress+'/api/project/' + id).map((response: Response) => response.json());
    }

    create(project: Project) {
        const body = JSON.stringify(project);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.httpAdress+'/api/project/',body, { headers: headers }).map((response: Response) => response.json());
    }

    getByDeveloper(id: number){
        return  this.http.get(this.httpAdress+'/api/project/developer/' + id).map((response: Response) => response.json());
    }
    update(project: Project) {
        return this.http.put(this.httpAdress+'/api/project/' + project.projectId, project).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.httpAdress+'/api/project/' + id).map((response: Response) => response.statusText/*response.json()*/);
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