import { Component } from '@angular/core';
import { FormModel } from 'src/app/model/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl:'./form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {
  formModel: FormModel = { name: '', email: '', message: '' };
  submitted = false;
  
  private apiUrl = 'https://127.0.0.1:8000/api';  // URL from API Platform

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  }, {});


  constructor(
    // private formService: FormService,
    private http: HttpClient 
    ) {}
  
    
  onSubmitForm(formModel: FormModel): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/public_form_post`, formModel)
        .pipe(
          catchError(error => {
            // Gérer l'erreur ici (logger ou afficher un message à l'utilisateur)
            console.error('Error submitting form:', error);
            throw error; // Réémettre l'erreur pour que le composant puisse également la gérer
          })
        );
    }
    
}
