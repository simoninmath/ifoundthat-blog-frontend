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

  // articleList: Article[] = [];
  articleList$: Observable<Article[]>;  // Type as a Table of Article

  // Use dependency injection to access services
  constructor(
    // private router: Router,
    private articleService: ArticleService
  ){
   }
  
  // The Method below launches the getUserEmailFromNewsletter() method when the program starts
  ngOnInit() {
    this.getArticleListFromDb();
  }

  // ngOnInit() {
  //   this.articleService.getArticleList()   // Get an Observable from Service
  //   .subscribe(articleList => articleList = articleList);   // Fallow Observable to get the article list and push it on the Component property 
  // }

  // goToArticleDetail(article: Article) {
  //   this.router.navigate(['/public_articles/', article.id]);
  // };

  getArticleListFromDb() {
    this.articleList$ = this.articleService.getArticleListFromDb()
    // The console.log below show hydra:member Array from JSON Object returned by the API
    // console.log(Object.values(response)[4]);
    // This method subscribes to the Observable of newsletter.service.ts 
    // .subscribe((response: Article[]) => {
    //   this.articleList = response;
    // });
  }

}
