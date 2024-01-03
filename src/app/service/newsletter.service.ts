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

  // Use Dependency Injection for the HttpClient Service with Constructor method
  constructor(
    private http: HttpClient
  ) {}

  // This method creates an Observable to listen for the response from the database, 
  // and decode the database JSON Object into an array with map(), 
  getUserEmailFromNewsletter(): Observable<Newsletter[]> {
    return this.http.get<any>(`${this.apiUrl}/newsletters`).pipe(
      map((response: any) => response['hydra:member'] as Newsletter[])
    );
  }
  
}