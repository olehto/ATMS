import { NgModule }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import {AppComponent} from './app.component';
import { routing }   from './app.routing';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {DashboardComponent} from './dashboard/index';
import {ProjectsComponent} from './projects/index';
import {TasksComponent} from './tasks/index';
import {NewTaskComponent} from './new_task/index';
import {TasksListComponent} from './tasks_list/index';
import {DevelopersComponent} from './developers/index';
import {StatisticsComponent} from './statistics/index';
import {DropdownModule} from "ngx-dropdown";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, routing, ChartsModule, DropdownModule],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        ProjectsComponent,
        TasksComponent,
        NewTaskComponent,
        TasksListComponent,
        DevelopersComponent,
        StatisticsComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }