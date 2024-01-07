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
// import { CardComponent } from './card/card.component';
// import { CardDetailComponent } from './card-detail/card-detail.component';


const routes: Routes = [
  // Routes always public
  // { path:'' },
  { path:'articles', title: 'IFT-Blog', component: ListArticleComponent },
  // Routes exceptions
  { path:'articles/detail/:id', title: 'IFT-Blog', component: DetailArticleComponent, canActivate: [AuthGuard] },
  { path:'articles/add', title: 'IFT-Blog', component: AddArticleComponent, canActivate: [AuthGuard] },
  { path:'articles/form', title: 'IFT-Blog', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path:'articles/edit/:id', title: 'IFT-Blog', component: EditArticleComponent, canActivate: [AuthGuard] },
  { path:'articles/:id', title: 'IFT-Blog', component: DetailArticleComponent, canActivate: [AuthGuard] }
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
    // CardComponent,
    // CardDetailComponent,
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
    HomeComponent,
    HeroComponent,
    NewsComponent,
    ListArticleComponent,
    DetailArticleComponent,
    AddArticleComponent,
    EditArticleComponent,
    NewsletterComponent,
    LoaderComponent,
    MoreButtonComponent,
    ArticleFormComponent,
  ],
  providers: [
    ArticleService
  ]
})

export class HomeModule { }
