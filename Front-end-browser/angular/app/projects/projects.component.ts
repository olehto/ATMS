/**
 * Created by Lenovo on 26.03.2017.
 */
/**
 * Created by Lenovo on 15.03.2017.
 */
import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component ({
    moduleId: module.id,
    selector: 'projects',
    styleUrls:['projects.component.css'],
    templateUrl: 'projects.component.html',
})

export class ProjectsComponent {
    condition: boolean=true;
    token: boolean = true;
    token2: boolean = true;
    toggle(){
        this.condition=!this.condition;
    }
    hidden(){
        this.token = !this.token;
    }
    hidden2(){
        this.token2 = !this.token2;
    }
}
