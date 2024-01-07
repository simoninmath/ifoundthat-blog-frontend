import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'https://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) {}

  getCardDetails(cardId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles/${cardId}`);  // Appel HTTP pour récupérer les détails de la carte
  }
}