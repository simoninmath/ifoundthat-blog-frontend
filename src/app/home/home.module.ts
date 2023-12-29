import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { NewsComponent } from './news/news.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    NewsComponent,
    DetailArticleComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})

export class HomeModule { }
