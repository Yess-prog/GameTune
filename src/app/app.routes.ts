import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import { GamesComponent } from './games/games.component';
import { PayementComponent } from './payement/payement.component';
import { Ps5Component } from './ps5/ps5.component';
import { Ps4Component } from './ps4/ps4.component';
import { X360Component } from './x360/x360.component';
import { X1Component } from './x1/x1.component';
import { PcComponent } from './pc/pc.component';
import { RpgComponent } from './rpg/rpg.component';
import { StrategyComponent } from './strategy/strategy.component';
import { SprotsComponent } from './sprots/sprots.component';
import { AdventureComponent } from './adventure/adventure.component';
import { ActionComponent } from './action/action.component';
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
        path:'register',component:RegisterComponent
    },
    {
        path:'admin',component:AdminSpaceComponent
    },
    {
        path:'games',component:GamesComponent
    },
    {
        path:'pay',component:PayementComponent
    },
    {
        path:'pc',component:PcComponent
    },
    {
        path:'x1',component:X1Component
    },
    {
        path:'x360',component:X360Component
    },
    {
        path:'ps4',component:Ps4Component
    },
    {
        path:'ps5',component:Ps5Component
    },
    {
        path:'action',component:ActionComponent
    },
    {
        path:'adventure',component:AdventureComponent
    },
    {
        path:'sports',component:SprotsComponent
    },
    {
        path:'strategy',component:StrategyComponent
    },
    {
        path:'rpg',component:RpgComponent
    },


];
