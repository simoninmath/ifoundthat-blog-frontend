import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormComponent } from '../home/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FooterModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    HttpClientModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    FormComponent
  ]
})

export class SharedModule { }
