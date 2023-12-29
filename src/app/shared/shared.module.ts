import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from '../home/newsletter/newsletter.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NewsletterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule, 
    RouterModule
  ],
  exports: [
    CommonModule,
    HttpClientModule, 
    RouterModule,
    NewsletterComponent
  ]
})

export class SharedModule { }
