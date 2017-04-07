import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            let token=JSON.parse(localStorage.getItem('token'));
            // logged in so return true
            if(token.expires-Date.now()>0){
                return true;
            }
            else{
                this.authenticationService.refresh().subscribe(
                    response => {
                        console.log(response);
                        localStorage.setItem('token', JSON.stringify({access_token:response.access_token,expires:(Date.now()+response.expires_in*1000),
                            refresh_token:response.refresh_token,received:Date.now()}));
                        return true;
                    },
                    error => {
                        console.log(error);
                        alert(error);
                        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                        return false;
                    }
                );

            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}