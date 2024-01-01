import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, tap } from 'rxjs';
import { Newsletter } from '../model/newsletter';

@Injectable({
  providedIn: 'root'
})

// Crée Observable pour écouter la DB
export class NewsletterService {
  private apiUrl = 'https://127.0.0.1:8000/api'; // URL from API Platform

  constructor(private http: HttpClient) { }

  getUserEmailFromNewsletter(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.apiUrl}/newsletters`);
  }

  getTiti(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>('https://127.0.0.1:8000/api/newsletters');
  }

  // getToto() {
  //   return this.http
  //     .get<Newsletter[]>('https://127.0.0.1:8000/api/newsletters')

  //     .pipe(
  //       tap(velos => {
  //         this.veloService.setVelos(velos['hydra:member']);
  //         this.veloService.setLoadingVeloList(false);
  //       })
  //     );
  // }

}