import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response,URLSearchParams } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        const body = JSON.stringify(user);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/api/users',body, { headers: headers }).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.username, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(username: string) {
        //const body = JSON.stringify(user);
        //console.log(body);
        /*let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        let body = urlSearchParams.toString()*/
        var body = 'username:'+username;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log(body);
        //let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/api/usersdel?username='+username,{headers: headers}).map((response: Response) => response.json());
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