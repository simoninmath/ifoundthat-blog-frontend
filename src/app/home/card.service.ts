import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'https://127.0.0.1:8000/api'; 

  // public formData !:  FormGroup;
  constructor(
    private http: HttpClient
  ) {}

  getCardDetails(cardId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/public_articles/${cardId}`);  // Appel HTTP pour récupérer les détails de la carte
  }

  // getIdFromDb(cardId: number): Observable<Object> {
  //   return this.http.get(`${this.apiUrl}/public_articles/${cardId}`);
  // }

}