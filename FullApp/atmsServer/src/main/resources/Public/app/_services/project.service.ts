/**
 * Created by EvSpirit on 22.03.2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Project } from '../_models/index';

@Injectable()
export class ProjectService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/project/').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/project/' + id).map((response: Response) => response.json());
    }

    create(project: Project) {
        const body = JSON.stringify(project);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/api/project/',body, { headers: headers }).map((response: Response) => response.json());
    }

    getByDeveloper(id: number){
        return  this.http.get('/api/project/developer/' + id).map((response: Response) => response.json());
    }
    update(project: Project) {
        return this.http.put('/api/project/' + project, project).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/project/' + id).map((response: Response) => response.json());
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