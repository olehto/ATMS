import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
/**
 * Created by EvSpirit on 25.04.2017.
 */
@Injectable()
export class StatusService {
    httpAdress: string;
    constructor(private http: Http) {
        this.httpAdress= 'http://localhost:8080';
    }

    getAll() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/status',{headers: headers}).map((response: Response) => response.json());
    }

    getById(id:number){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(localStorage.getItem('token')).access_token);
        return this.http.get(this.httpAdress+'/api/status/'+id,{headers: headers}).map((response: Response) => response.json());
    }

}