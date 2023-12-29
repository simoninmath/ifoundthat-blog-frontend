import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path:'', title: 'IFT-Blog', redirectTo: 'home', pathMatch: 'full' },   // Default Route with pathMath to avoid "side effects"
  { path:'login', title: 'IFT-Blog', component: LoginComponent },
  { path:'**', title: '404 error', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
