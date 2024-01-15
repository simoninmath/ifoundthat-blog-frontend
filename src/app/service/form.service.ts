import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormModel } from '../model/form';

@Injectable({
  providedIn: 'root',
})

export class FormService {
  private apiUrl = 'https://127.0.0.1:8000/api';  // URL from API Platform

  constructor(private http: HttpClient) {}

  submitForm(formModel: FormModel): Observable<any> {
  
    return this.http.post<any>(`${this.apiUrl}/public_form_post`, formModel);  // Send data from form to Symfony back-end Controller
  }
}
