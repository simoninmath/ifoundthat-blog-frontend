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
  imgArticleMain: string;

  constructor(
    private articleService: ArticleService  // Use dependency injection to access services
  ){}
  
  // The Method below launches the getUserEmailFromNewsletter() method when the program starts
  ngOnInit() {
    this.getArticleListFromDb();
    this.imgArticleMain = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }

  getArticleListFromDb() {
    this.articleList$ = this.articleService.getArticleListFromDb();
  }

  trackByFn(index: number, item: Article){
    return index;
  }

  goToReddit() {
    const redditWebSite = 'https://www.reddit.com/';
    window.open(redditWebSite, '_blank', 'noopener,noreferrer');  // Open the link in a new window, and avoid the reference call back to secure the external link
  }

}
