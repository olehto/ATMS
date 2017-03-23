import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    httpAdress: string;
    constructor(private http: Http) {
        this.httpAdress= 'http://localhost:8080';
    }

    getAll() {
        return this.http.get(this.httpAdress+'/api/developer/').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.httpAdress+'/api/developer/' + id).map((response: Response) => response.json());
    }

    remind(email: string){
        return this.http.get(this.httpAdress+'/api/developer/'+ email).map((response: Response) => response.json());
    }

    create(user: User) {
        const body = JSON.stringify(user);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.httpAdress+'/api/developer/',body, { headers: headers }).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.httpAdress+'/api/developer/' + user, user).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.httpAdress+'/api/developer/' + id).map((response: Response) => response.json());
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