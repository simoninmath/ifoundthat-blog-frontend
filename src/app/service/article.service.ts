import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Create } from '../model/create';

@Injectable() // Delete providedIn: 'root' to use Service only in ArticleModule

export class ArticleService {

  // URL from API Platform contained in a Variable named "apiUrl"
  private apiUrl = 'https://127.0.0.1:8000/api';


  // Use Dependency Injection for the HttpClient Service with Constructor method
  constructor(
    private http: HttpClient
  ) {}


  // CRUD: Get article list (GET Collection method) from DB with API Platform
  getArticleListFromDb(): Observable<Article[]> {
    // This method creates an Observable to listen for the response from the database,
    return this.http
      .get<any>(`${this.apiUrl}/articles`) // URL need to be exactly the same authorized in Symfony security.yaml file
      .pipe(map((response: any) => response['hydra:member'] as Article[])); // and decode the database JSON Object into an array with map(),
  }


  // CRUD: Get one article (GET method)
  getArticleByIdFromDb(articleId: number): Observable<Article | undefined> {
    return this.http
      .get<Article>(`${this.apiUrl}/articles/${articleId}`)
      .pipe(
        map((response: any) => response as Article),
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, undefined))
      );
  }


  //CRUD: Update article (PUT method)
  putArticle(article: Article): Observable<Article> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put<Article>(`${this.apiUrl}/articles/${article.id}`, article, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }


  // CRUD: Delete article (DELETE method)
  deleteArticleById(articleId: number): Observable<Article> {
    return this.http
      .delete<Article>(`${this.apiUrl}/articles/${articleId}`)
      .pipe(catchError((error) => this.handleError(error, null)));
  }


  // CRUD: Create article (POST method)
  addArticle(article: Article): Observable<Article> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<Article>(`${this.apiUrl}/articles`, article, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  
  // Method from create form
  createFormArticles(createDataArticle: Create) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<Article>(`${this.apiUrl}/articles`, createDataArticle, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }


  private log(response: Article[] | Article | undefined) {
    console.table(response);
  }


  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }


  // This method search a corresponding term from searchbar into article list
  searchArticleList(term: string): Observable<Article[]> {
    if (term.length <= 1) {
      // If the research term is too small, return an empty Table to avoid call Server
      return of([]);
    }

    return this.http.get<Article[]>(`${this.apiUrl}/articles/?name=${term}`).pipe(
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
