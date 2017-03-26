import { NgModule }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AppComponent} from './app.component';
import { routing }   from './app.routing';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {DashboardComponent} from './dashboard/index';
import {ProjectsComponent} from './projects/index';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, routing],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        ProjectsComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }