/**
 * Created by Serpent on 09.03.2017.
 */
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {DashboardComponent} from './dashboard/index';
import {ProjectsComponent} from './projects/index';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'projects', component: ProjectsComponent},
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);