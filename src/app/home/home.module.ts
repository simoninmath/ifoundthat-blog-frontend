import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { NewsComponent } from './news/news.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    NewsComponent,
    ListArticleComponent,
    DetailArticleComponent,
    NewsletterComponent,
    FormComponent
  ],
  imports: [
    CommonModule
  ]
})

export class HomeModule { }
