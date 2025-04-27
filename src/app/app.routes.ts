import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ConsolesComponent } from './consoles/consoles.component';
import { RegisterComponent } from './register/register.component';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
export const routes: Routes = [
    {path:'app-root',component:AppComponent },
    {
        path:'',component: HomeComponent
    }
    ,
    {
        path:'login',component:LoginComponent
    },
    {
        path:'consoles',component:ConsolesComponent
    },
    {
        path:'register',component:RegisterComponent
    },
    {
        path:'admin',component:AdminSpaceComponent
    },

];
