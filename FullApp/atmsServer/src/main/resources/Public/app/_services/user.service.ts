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
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.get(this.httpAdress+'/api/developer/',{headers: headers}).map((response: Response) => response.json());
    }

    getById(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.get(this.httpAdress+'/api/developer/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    remind(email: string){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.get(this.httpAdress+'/api/developer/'+ email,{headers: headers}).map((response: Response) => response.json());
    }

    create(user: User) {
        const body = JSON.stringify(user);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.post(this.httpAdress+'/register',body, { headers: headers }).map((response: Response) => response.json());
    }

    update(user: User) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.put(this.httpAdress+'/api/developer/' + user, user,{headers: headers}).map((response: Response) => response.json());
    }

    delete(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.delete(this.httpAdress+'/api/developer/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    getDevTypes(){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
        return this.http.get(this.httpAdress+'/api/devType/',{headers: headers}).map((response: Response) => response.json());
    }
}