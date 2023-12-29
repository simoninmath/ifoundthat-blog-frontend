import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from '../home/newsletter/newsletter.component';



@NgModule({
  declarations: [
    NewsletterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewsletterComponent
  ]
})

export class SharedModule { }
