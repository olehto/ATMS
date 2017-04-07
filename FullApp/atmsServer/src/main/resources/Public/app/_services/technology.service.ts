/**
 * Created by EvSpirit on 24.03.2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Technology } from '../_models/index';

@Injectable()
export class TechnologyService {
    httpAdress: string;
    constructor(private http: Http) {
        this.httpAdress= 'http://localhost:8080';
    }

    getAll() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/technology/',{headers: headers}).map((response: Response) => response.json());
    }
}