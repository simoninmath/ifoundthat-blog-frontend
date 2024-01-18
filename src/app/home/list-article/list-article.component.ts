import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})

export class ListArticleComponent {

  articleList$: Observable<Article[]>;  // Type as a table of article. $ symbole means an Observable by convention


  constructor(
    private articleService: ArticleService  // Use dependency injection to access services
  ){
   }
  
  // The Method below launches the getUserEmailFromNewsletter() method when the program starts
  ngOnInit() {
    this.getArticleListFromDb();
  }

  getArticleListFromDb() {
    this.articleList$ = this.articleService.getArticleListFromDb();
  }

  trackByFn(index: number, item: Article){
    return index;
  }

}
