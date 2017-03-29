import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService, ProjectService, TechnologyService, TypeService, PriorityService, TaskService } from './_services/index';
import { DashboardComponent } from './dashboard/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ProjectsComponent} from './projects/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        RegisterComponent,
        ProjectsComponent
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