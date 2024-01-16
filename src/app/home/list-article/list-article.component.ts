import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
})

export class ListArticleComponent {
  // Observable to store the list of articles
  articleList$: Observable<Article[]>;

  // Constructor injecting the ArticleService
  constructor(private articleService: ArticleService) {}

  // Lifecycle hook called after Angular has initialized all data-bound properties
  ngOnInit() {
    // Call the method to retrieve the article list from the database
    this.getArticleListFromDb();
  }

  // Method to fetch the article list from the ArticleService
  getArticleListFromDb() {
    // Assign the observable returned by the service to the articleList$
    this.articleList$ = this.articleService.getArticleListFromDb();
  }
}


// import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Article } from 'src/app/model/article';
// import { ArticleService } from 'src/app/service/article.service';

// @Component({
//   selector: 'app-list-article',
//   templateUrl: './list-article.component.html',
//   styleUrls: ['./list-article.component.scss'],
// })

// export class ListArticleComponent {
//   articleList$: Observable<Article[]>;

//   constructor(private articleService: ArticleService) {}

//   ngOnInit() {
//     this.getArticleListFromDb();
//   }

//   getArticleListFromDb() {
//     this.articleList$ = this.articleService.getArticleListFromDb();
//   }
// }
