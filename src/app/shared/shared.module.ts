import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from '../home/newsletter/newsletter.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ListArticleComponent } from '../home/list-article/list-article.component';
import { NewsComponent } from '../home/news/news.component';
import { FormComponent } from '../home/form/form.component';



@NgModule({
  declarations: [
    NewsletterComponent,
    NewsComponent,
    ListArticleComponent,
    FormComponent
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
    NewsComponent,
    ListArticleComponent,
    FormComponent
  ]
})

export class SharedModule { }
