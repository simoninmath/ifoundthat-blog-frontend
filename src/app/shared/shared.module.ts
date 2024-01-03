import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from '../home/newsletter/newsletter.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ListArticleComponent } from '../home/list-article/list-article.component';
import { NewsComponent } from '../home/news/news.component';
import { FormComponent } from '../home/form/form.component';
import { LoginComponent } from '../auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewsletterComponent,
    NewsComponent,
    ListArticleComponent,
    LoginComponent,
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
    NewsletterComponent,
    NewsComponent,
    ListArticleComponent,
    LoginComponent,
    FormComponent
  ]
})

export class SharedModule { }
