import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Newsletter } from '../model/newsletter';

@Injectable({
  providedIn: 'root'
})

export class NewsletterService {
  // URL from API Platform contained in a Variable named "apiUrl"
  private apiUrl = 'https://127.0.0.1:8000/api/custom'; 

  // Use Dependency Injection for the HttpClient Service with Constructor method
  constructor(
    private http: HttpClient
  ) {}

  // log
  private log(response: Newsletter[] | Newsletter | undefined){
    console.table(response);
  }

  // catch error
  private handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue); 
  }

  // This method creates an Observable to listen for the response from the database, 
  // and decode the database JSON Object into an array with map(),
  // CRUD: Get Collection
  getUserEmailFromNewsletter(): Observable<Newsletter[]> {
    return this.http.get<any>(`${this.apiUrl}/protected_newsletters_get_collection`).pipe(
      map((response: any) => response['hydra:member'] as Newsletter[])
    );
  }
  
  // getNewsletterList(): Observable<Newsletter[]> {  // Return an Observable because the Object Newsletter[] will be receive later
  //   return this.http.get<Newsletter[]>('api/custom/protected_newsletters_get_collection').pipe(  // Making a HTTP Request that return an Object Observable with URL
  //     tap((newsletterList) => console.table(newsletterList)),  // Log response
  //     catchError((error) => this.handleError(error, []))
  //   ); 
  // }

  // CRUD: Get
  getNewsletterById(newsletterId: number): Observable<Newsletter | undefined> {
    return this.http.get<Newsletter>(`${this.apiUrl}/protected_newsletters_get_by_id/${newsletterId}`).pipe(  // Making an HTTP Request that return an Object Observable with URL
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, undefined))
    );
  }

  
  // CRUD: Post
  addNewsletterEmail(newsletter: Newsletter): Observable<Newsletter> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    
    return this.http.post<Newsletter>(`${this.apiUrl}/public_newsletters_post`, newsletter, httpOptions).pipe(  // This Method return a Newsletter Type Object with cast "<Newsletter>"
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  
  // Method from create form
  createFormNewsletter(createDataNewsletter: Newsletter): Observable<Newsletter> {
    console.log('SUBMIT FROM NEWSLETTER CREATE FORM METHOD', createDataNewsletter);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<Newsletter>(`${this.apiUrl}/public_newsletters_post`, createDataNewsletter, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }


  // CRUD: Put
  updateNewsletter(newsletter: Newsletter): Observable<null> {
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put<Newsletter>(`${this.apiUrl}/protected_newsletters_put/${newsletter.id}`, newsletter, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
    );
}

  // CRUD: Delete
  deleteNewsletterById(newsletterId: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/protected_newsletters_delete/${newsletterId}`).pipe(
      //tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }
}