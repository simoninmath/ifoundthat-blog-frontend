import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})

export class ListArticleComponent {
  articleList: Article[];  // Type as a Table of Article

  constructor(
    private router: Router,
    private articleService: ArticleService
  ){
      this.articleList = [];   
   }
    
  goToArticle(article: Article) {   // Go back Method
    this.router.navigate(['/article', article.id]);
  };

  ngOnInit() {
    this.articleService.getArticleList()   // Get an Observable from Service
    .subscribe(articleList => articleList = articleList);   // Fallow Observable to get the article list and push it on the Component property 
  }

}
