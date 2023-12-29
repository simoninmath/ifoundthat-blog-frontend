import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = 'http://localhost:8000/newsletters'; // URL de votre API backend

  constructor(private http: HttpClient) { }

  getSubscribers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subscribers`);
  }
}

