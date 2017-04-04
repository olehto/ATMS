import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {encode} from "@angular/router/src/url_tree";

@Injectable()
export class AuthenticationService {
    httpAdress: string;
    private clientId ='atms';
    private clientSecret ='secret';
    constructor(private http: Http) {
       this.httpAdress= 'http://localhost:8080/oauth/token';
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
        let options = new RequestOptions({ headers: headers });

        let params: URLSearchParams = new URLSearchParams();
        params.set('password', password );
        params.set('username', username );
        params.set('grant_type', 'password' );
        params.set('scope','read write');
        params.set('client_secret', this.clientSecret );
        params.set('client_id', this.clientId );
        return this.http.post(this.httpAdress, params.toString(), { headers: headers })
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
    /*
    login(email: string, password: string) {
        //console.log(JSON.stringify({ email: email, password: password }));
        return this.http.post(this.httpAdress+'/api/developer/authorize', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                console.log(user);
                if (user.email!=null) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }*/
}