import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  searchTerms = new Subject<string>();  // Subject is an RxJS library Object
  articles$: Observable<Article[]>;  // For create a flow with user's terms in a Table

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
    ) {
  }

  ngOnInit() { // Firstable, clean up the user search expression
    // {..."a"."ab"..."abz"."ab"...."abc"......}
    this.articles$ = this.searchTerms.pipe(
      debounceTime(300),
    // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
    // {......"ab"............"abc"......}
      switchMap((term) => this.articleService.searchArticleList(term)) // Then, call the server
    // {......articleList(ab).......articleList(abc).....}
      );
  }

  search(term: string) {
    this.searchTerms.next(term); // If a user search a term, this Method push the result of Subject
  }

  goToDetailArticle(article: Article) {
    const link = ['/article', article.id]; // Construct the link where the user will be redirected according to article id
    this.router.navigate(link); // Redirect the user with Angular Router
  }

  isLogin(): any {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  getUser(){
    this.authService.getUserFromToken();
  }

}
