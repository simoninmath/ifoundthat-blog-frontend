import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from '../home/newsletter/newsletter.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ListArticleComponent } from '../home/list-article/list-article.component';



@NgModule({
  declarations: [
    NewsletterComponent,
    ListArticleComponent
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
    NewsletterComponent,
    ListArticleComponent
  ]
})

export class SharedModule { }
