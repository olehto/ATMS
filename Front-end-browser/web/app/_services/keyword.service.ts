/**
 * Created by EvSpirit on 24.03.2017.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';

import { Priority } from '../_models/index';
import {Keyword} from "../_models/keyword";

@Injectable()
export class KeywordService {
    httpAdress: string;
    constructor(private http: Http) {
        this.httpAdress= 'http://localhost:8080';
    }

    getAll() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/keyword',{headers: headers}).map((response: Response) => response.json());
    }

    getById(id: number) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/keyword/' + id,{headers: headers}).map((response: Response) => response.json());
    }

    add(value:string, taskId, importance:number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        let params: URLSearchParams = new URLSearchParams();
        params.set('value', value );
        params.set('taskId',taskId);
        params.set('importance', importance+"");
        return this.http.post(this.httpAdress+'/api/keyword',params.toString(),{headers: headers}).map((response: Response) => response.json());
    }



}