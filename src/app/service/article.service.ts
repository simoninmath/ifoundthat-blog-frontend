import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable() // Delete providedIn: 'root' to use Service only in ArticleModule

export class ArticleService {
  // URL from API Platform contained in a Variable named "apiUrl"
  private apiUrl = 'https://127.0.0.1:8000/api';

  // Use Dependency Injection for the HttpClient Service with Constructor method
  constructor(
    private http: HttpClient
  ) {}

  // This method creates an Observable to listen for the response from the database,
  // and decode the database JSON Object into an array with map(),
  getArticleListFromDb(): Observable<Article[]> {
    return this.http
      .get<any>(`${this.apiUrl}/public_articles`)  // URL need to be exactly the same authorized in Symfony security.yaml file
      .pipe(map((response: any) => response['hydra:member'] as Article[]));
  }

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

  deleteArticleById(articleId: number): Observable<null> {
    return this.http
      .delete<null>(`api/articles/${articleId}`)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

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

  searchArticleList(term: string): Observable<Article[]> {
    // Request a name with term enter by user
    // If the research term is too small, return an empty Table to avoid call Server
    if (term.length <= 1) {
      return of([]);
    }

    return this.http.get<Article[]>(`api/public_articles/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, [])) // If there is an error in the term, return a empty Table
    );
  }

  getArticleCategoryList(): string[] {
    return ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5'];
  }
}
