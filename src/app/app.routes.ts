import { Routes } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {authGuard} from './auth/auth.guard';

export const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'',canActivate:[authGuard],children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
      {path:'rooms',loadComponent: () => import('./rooms/rooms-list/rooms-list.component').then(m => m.RoomsListComponent)},
      {path:'booking',loadChildren: () => import('./bookings/booking.routes').then(m => m.bookingRoutes)},
      {path:'admin',loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)}
    ]},

];
