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
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { NavigationModule } from '../navigation/navigation.module';
import { ArticleService } from '../service/article.service';


const routes: Routes = [
  // { path:'home', title: 'IFT-Blog', component: HomeComponent, canActivate: [AuthGuard] },
  { path:'articles', title: 'IFT-Blog', component: ListArticleComponent },
  { path:'article/detail', title: 'IFT-Blog', component: DetailArticleComponent },
  { path:'article/add', title: 'IFT-Blog', component: AddArticleComponent, canActivate: [AuthGuard] },
  { path:'article/form', title: 'IFT-Blog', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path:'article/edit', title: 'IFT-Blog', component: EditArticleComponent, canActivate: [AuthGuard] },
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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    SharedModule,
    RouterModule.forChild(routes)
  ], 
  exports: [
    HomeComponent
  ],
  providers: [
    ArticleService
  ]
})

export class HomeModule { }
