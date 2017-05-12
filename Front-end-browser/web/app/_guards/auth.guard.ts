import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";
import {Token} from "../_models/token";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private userService:UserService) { }

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
                        this.userService.getCurrent().subscribe(
                            response=>{
                                let temp:Token=JSON.parse(localStorage.getItem('token'));
                                let dev:User=response;
                                temp.developer_id=dev.developerId.toLocaleString();
                                temp.nickname=dev.nickname;
                                localStorage.setItem('token',JSON.stringify(temp));
                                return true;
                            }
                        )

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
        else{
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}