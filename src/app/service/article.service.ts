import { Injectable } from "@angular/core";
import { Article } from "../model/article";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of, tap } from "rxjs";

@Injectable()  // Delete providedIn: 'root' to use Service only in ArticleModule

export class ArticleService {
  
  constructor(private http: HttpClient){}

  getArticleList(): Observable<Article[]> {  // Return an Observable because the Object Article[] will be receive later
    return this.http.get<Article[]>('api/articles').pipe(  // Making a HTTP Request that return an Object Observable with URL
      tap((articleList) => console.table(articleList)),  // Log response
      catchError((error) => this.handleError(error, []))
    ); 
  }

  getArticleById(articleId: number): Observable<Article | undefined> {
    return this.http.get<Article>(`api/articles/${articleId}`).pipe(  // Making a HTTP Request that return an Object Observable with URL
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, undefined))
    );
  }

  // Refactoring
  private log(response: Article[] | Article | undefined){
    console.table(response);
  }

  private handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue); 
  }

  updateArticle(article: Article): Observable<null> {  // In Memory API force to use null Object instead of <Article | undefined>
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  
    return this.http.put<Article>('api/articles', article, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  deleteArticleById(articleId: number): Observable<null> {
    return this.http.delete<null>(`api/articles/${articleId}`).pipe(
      //tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  addArticle(Article: Article): Observable<Article> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    
    return this.http.post<Article>('api/articles', Article, httpOptions).pipe(  // This Method return a Article Type Object with cast "<Article>"
      // tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  searchArticleList(term: string): Observable<Article[]> {  // Request a name with term enter by user
    return this.http.get<Article[]>(`api/articles/?name={term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))  // If there is an error in the term, return a empty Table
    )
  }

  getArticleCategoryList(): string[] {
    return [
      'Cat 1',
      'Cat 2',
      'Cat 3',
      'Cat 4',
      'Cat 5'
    ];
  }

}
