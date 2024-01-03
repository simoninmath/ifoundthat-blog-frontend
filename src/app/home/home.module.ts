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
<<<<<<< HEAD
import { LoaderComponent } from './loader/loader.component';
import { BorderArticleDirective } from './border-article.directive';
import { MoreButtonComponent } from './more-button/more-button.component';
=======
import { ArticleFormComponent } from './article-form/article-form.component';
>>>>>>> article-form


@NgModule({
  declarations: [
    HomeComponent,
    AddArticleComponent,
    EditArticleComponent,
<<<<<<< HEAD
    LoaderComponent,
    BorderArticleDirective,
    MoreButtonComponent,
=======
    ArticleFormComponent,
>>>>>>> article-form
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})

export class HomeModule { }
