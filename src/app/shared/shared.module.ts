import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormComponent } from '../home/form/form.component';
// import { LoginComponent } from '../auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // LoginComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    RouterModule
  ],
  exports: [
    CommonModule,
    HttpClientModule, 
    RouterModule,
    // LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    FormComponent
  ]
})

export class SharedModule { }
