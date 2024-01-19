import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable() // Delete providedIn: 'root' to use Service only in ArticleModule
export class ArticleService {
  // URL from API Platform contained in a Variable named "apiUrl"
  private apiUrl = 'https://127.0.0.1:8000/api';

  // Use Dependency Injection for the HttpClient Service with Constructor method
  constructor(private http: HttpClient) {}

  // CRUD: Get article list (GET Collection method) from DB with API Platform
  getArticleListFromDb(): Observable<Article[]> {
    // This method creates an Observable to listen for the response from the database,
    return this.http
      .get<any>(`${this.apiUrl}/public_articles`) // URL need to be exactly the same authorized in Symfony security.yaml file
      .pipe(map((response: any) => response['hydra:member'] as Article[])); // and decode the database JSON Object into an array with map(),
  }

  // CRUD: Get one article (GET method)
  getArticleByIdFromDb(articleId: number): Observable<Article | undefined> {
    return this.http
      .get<Article>(`${this.apiUrl}/public_articles/${articleId}`)
      .pipe(
        map((response: any) => response as Article),
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, undefined))
      );
  }

  private log(response: Article[] | Article | undefined) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  updateArticle(article: Article): Observable<null> {
    // In Memory API force to use null Object instead of <Article | undefined>
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put<Article>('api/articles/', article, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  //CRUD: Update article (PUT method)
  putArticle(article: Article) {
    return this.http
      .delete<null>(`api/articles/${article}`)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

  // CRUD: Delete article (DELETE method)
  deleteArticleById(articleId: number): Observable<null> {
    return this.http
      .delete<null>(`api/articles/${articleId}`)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

  // CRUD: Create article (POST method)
  addArticle(article: Article): Observable<Article> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<Article>('api/articles/add', article, httpOptions)
      .pipe(
        // This Method return a Article Type Object with cast "<Article>"
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  // This method search a corresponding term from searchbar into article list
  searchArticleList(term: string): Observable<Article[]> {
    if (term.length <= 1) {
      // If the research term is too small, return an empty Table to avoid call Server
      return of([]);
    }

    return this.http.get<Article[]>(`api/public_articles/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, [])) // If there is an error in the term, return a empty Table
    );
  }

  getArticleCategoryList(): string[] {
    return [
      'Categorie 1',
      'Categorie 2',
      'Categorie 3',
      'Categorie 4',
      'Categorie 5',
    ];
  }
}
