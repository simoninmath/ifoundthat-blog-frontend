import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { NewsComponent } from './news/news.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { AddArticleComponent } from './add-article/add-article.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddArticleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})

export class HomeModule { }
