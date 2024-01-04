import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { NewsComponent } from './news/news.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { SharedModule } from '../shared/shared.module';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { LoaderComponent } from './loader/loader.component';
import { BorderArticleDirective } from './border-article.directive';
import { MoreButtonComponent } from './more-button/more-button.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { ArticleCategoryColorPipe } from './category-article.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsletterComponent } from './newsletter/newsletter.component';
// import { SearchbarComponent } from '../navigation/searchbar/searchbar.component';
// import { NavbarComponent } from '../navigation/navbar/navbar.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

// canActivate: [AuthGuard]

const routes: Routes = [
  { path:'home', title: 'IFT-Blog', component: HomeComponent },
  { path:'articles', title: 'IFT-Blog', component: ListArticleComponent },
  { path:'article/add', title: 'IFT-Blog', component: AddArticleComponent },
  { path:'article/form', title: 'IFT-Blog', component: ArticleFormComponent },
  { path:'article/detail', title: 'IFT-Blog', component: DetailArticleComponent },
  { path:'article/edit', title: 'IFT-Blog', component: EditArticleComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    NewsComponent,
    ListArticleComponent,
    DetailArticleComponent,
    AddArticleComponent,
    EditArticleComponent,
    NewsletterComponent,
    LoaderComponent,
    BorderArticleDirective,
    MoreButtonComponent,
    ArticleFormComponent,
    ArticleCategoryColorPipe,
    // NavbarComponent,
    // SearchbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})

export class HomeModule { }
