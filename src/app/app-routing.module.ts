import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'', title: 'IFT-Blog', redirectTo: 'home', pathMatch: 'full' },   // Default Route with pathMath to avoid "side effects"
  { path:'home', title: 'IFT-Blog', component: HomeComponent },
  { path:'login', title: 'IFT-Blog', component: LoginComponent },
  { path:'register', title: 'IFT-Blog', component: RegisterComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
