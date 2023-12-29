import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NewsletterService {
  private apiUrl = 'https://127.0.0.1:8000/api';   // URL from API Platform

  constructor(
    private http: HttpClient
    ) { }

  getSubscribers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/newsletters`);
  }
}