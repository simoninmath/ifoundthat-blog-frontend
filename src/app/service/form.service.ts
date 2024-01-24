import { Injectable } from '@angular/core';
import { ContactForm } from '../model/contact-form';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  
  // URL from API Platform contained in a Variable named "apiUrl"
  private apiUrl = 'https://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient
  ) {}

  // CRUD: Create contact form (POST method)
  createContactForm(createDataForm: ContactForm): Observable<ContactForm> {
    console.log('SUBMIT FROM CONTACT FORM', createDataForm);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<ContactForm>(`${this.apiUrl}/forms`, createDataForm, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  private log(response: ContactForm | undefined) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
