import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Newsletter } from '../model/newsletter';

@Injectable({
  providedIn: 'root'
})

export class NewsletterService {
  // URL from API Platform contained in a Variable named "apiUrl"
  private apiUrl = 'https://127.0.0.1:8000/api'; 

  // Use DI for the HttpClient Service with Constructor method
  constructor(
    private http: HttpClient
  ) {}

  // This method creates an observable to listen for the response from the database, 
  // and transform the database JSON object into an array with map(), 
  // because the *ngFor directive can only iterate through an ARRAY! Not in a JSON object!
  getUserEmailFromNewsletter(): Observable<Newsletter[]> {
    return this.http.get<any>(`${this.apiUrl}/newsletters`).pipe(
      map((response: any) => response['hydra:member'] as Newsletter[])
    );
  }
  
}