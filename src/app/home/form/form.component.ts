import { Component } from '@angular/core';
import { FormModel } from 'src/app/model/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl:'./form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {
  // Model to store form data
  formModel: FormModel = { name: '', email: '', message: '' };
  // Flag to track if the form has been submitted
  submitted = false;
  
  // API endpoint URL
  private apiUrl = 'https://127.0.0.1:8000/api';  

  // Reactive form group with form controls and validators
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  }, {});

  // Constructor with dependency injection for HttpClient
  constructor(private http: HttpClient) {}
    
  // Method to handle form submission
  onSubmitForm(formModel: FormModel): Observable<any> {
    // Make a POST request to the API endpoint with the form data
    return this.http.post<any>(`${this.apiUrl}/public_form_post`, formModel)
      .pipe(
        catchError(error => {
          // Log the error to the console
          console.error('Error submitting form:', error);
    
          // Handle the error entirely within the service
          return of({ success: false, error: 'Submission failed' });
        })
      );
  }
}



// import { Component } from '@angular/core';
// import { FormModel } from 'src/app/model/form';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Observable, catchError, of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-form',
//   templateUrl:'./form.component.html',
//   styleUrls: ['./form.component.scss']
// })

// export class FormComponent {
//   formModel: FormModel = { name: '', email: '', message: '' };
//   submitted = false;
  
//   private apiUrl = 'https://127.0.0.1:8000/api';  // URL from API Platform

//   form = new FormGroup({
//     name: new FormControl('', [Validators.required]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     message: new FormControl('', [Validators.required]),
//   }, {});


//   constructor(
//     private http: HttpClient 
//     ) {}
  
    
//     onSubmitForm(formModel: FormModel): Observable<any> {
//       // Make a POST request to the API endpoint with the form data
//       return this.http.post<any>(`${this.apiUrl}/public_form_post`, formModel)
//         .pipe(
//           catchError(error => {
//             // Show error messsage in console
//             console.error('Error submitting form:', error);
    
//             // handle the error entirely within the service
//            return of({ success: false, error: 'Submission failed' });
//           })
//         );
//     }
//   }

  // onSubmitForm(formModel: FormModel): Observable<any> {
  //     return this.http.post<any>(`${this.apiUrl}/public_form_post`, formModel)
  //       .pipe(
  //         catchError(error => {
  //           // Gérer l'erreur ici (logger ou afficher un message à l'utilisateur)
  //           console.error('Error submitting form:', error);
  //           throw error; // Réémettre l'erreur pour que le composant puisse également la gérer
  //         })
  //       );
  //   }

