import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { NewsComponent } from './news/news.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { LoaderComponent } from './loader/loader.component';
import { BorderArticleDirective } from './border-article.directive';


@NgModule({
  declarations: [
    HomeComponent,
    AddArticleComponent,
    EditArticleComponent,
    LoaderComponent,
    BorderArticleDirective,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})

export class HomeModule { }
