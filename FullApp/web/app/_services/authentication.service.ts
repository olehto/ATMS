import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
    httpAdress: string;
    private clientId ='atms';
    private clientSecret ='secret';
    constructor(private http: Http) {
       this.httpAdress= 'http://localhost:8080';
    }

    private handleData(res: Response) {
        let body = res.json();
        return body;
    }

    login(username,password){
        let headers = new Headers();
        headers.append("Accept","application/json");
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization','Basic '+btoa(this.clientId+':'+this.clientSecret));
        let params: URLSearchParams = new URLSearchParams();
        params.set('password', password );
        params.set('username', username );
        params.set('grant_type', 'password' );
        params.set('scope','read write');
        params.set('client_secret', this.clientSecret );
        params.set('client_id', this.clientId );
        return this.http.post(this.httpAdress+'/oauth/token', params.toString(), { headers: headers })
            .map(res =>this.handleData(res));//res => res.json());
    }
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    public logout() {
        localStorage.removeItem('token');
    }
    public refresh(){
        let headers = new Headers();
        headers.append("Accept","application/json");
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization','Basic '+btoa(this.clientId+':'+this.clientSecret));
        let options = new RequestOptions({ headers: headers });
        let token=JSON.parse(localStorage.getItem('token'));
        let params: URLSearchParams = new URLSearchParams();
        params.set('grant_type', 'refresh_token' );
        params.set('refresh_token',token.refresh_token);
        params.set('client_secret', this.clientSecret );
        params.set('client_id', this.clientId );

        return this.http.post(this.httpAdress+'/oauth/token', params.toString(), { headers: headers })
            .map(res =>this.handleData(res));
    }

    public restore(mail: string){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', mail );
        return this.http.post(this.httpAdress+'/user/resetPassword/',params.toString(),{ headers: headers });//.map((response: Response) => response.json());
    }

    public change(mail: string, token: string, password: string){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', mail );
        params.set('token', token);
        params.set('password', password);
        return this.http.post(this.httpAdress+'/user/changePassword/',params.toString(),{ headers: headers });//.map((response: Response) => response.json());
    }
}