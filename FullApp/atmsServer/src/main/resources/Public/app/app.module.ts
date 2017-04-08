import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService, ProjectService, TechnologyService, TypeService, PriorityService, TaskService } from './_services/index';
import { DashboardComponent } from './dashboard/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ProjectsComponent} from './projects/index';
import {TasksComponent} from './tasks/index';
import {NewTaskComponent} from './new_task/index';
import {TasksListComponent} from './tasks_list/index';
import {DevelopersComponent} from './developers/index';
import {StatisticsComponent} from './statistics/index';
import {DropdownModule} from "ngx-dropdown";
import {RestoreComponent} from './restore/index';
import {NewPasswordComponent} from './new_pass/index';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        ChartsModule,
        DropdownModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        RegisterComponent,
        ProjectsComponent,
        TasksComponent,
        NewTaskComponent,
        TasksListComponent,
        DevelopersComponent,
        StatisticsComponent,
        RestoreComponent,
        NewPasswordComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        ProjectService,
        PriorityService,
        TechnologyService,
        TypeService,
        TaskService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }