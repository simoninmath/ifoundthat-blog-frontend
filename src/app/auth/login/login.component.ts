import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage: string; // Holds error messages for display in the template
  form: FormGroup; // Angular Reactive Form for login inputs

  constructor(
    private formBuilder: FormBuilder, // Service for building Angular forms
    private auth: AuthService, // Authentication service
    private router: Router, // Angular router for navigation
    private ui: UiService // Service for managing UI state
  ) {
    // Initialize the form with validation rules
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Function triggered on form submission
  onSubmitFormLogin() {
    if (this.form.invalid) {
      return; // Stop execution if form is invalid
    }

    // Enable loading screen
    this.ui.activateLoading();

    // Call the authentication service to log in
    this.auth.authenticate(this.form.value).subscribe({
      next: (result) => {
        console.log('RESULT', result);
        // Disable loading screen
        this.ui.deactivateLoading();
        this.errorMessage = 'Error!';
        // Navigate to the home page on successful login
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        // Disable loading screen
        this.ui.deactivateLoading();

        if (error.status === 401) {
          // Handle unauthorized access error
          this.errorMessage =
            'No user account is associated with this email address...';
          return;
        }
        // Handle other errors
        this.errorMessage =
          'Something is wrong... Please try again in a few minutes.';
      },
    });
  }
  
  // The commented-out code appears to be an alternative implementation
  // It includes an ngOnInit lifecycle hook and methods for login/logout
  // However, it seems to be an older or alternative version of the component
  // and is not being used in the current implementation.
}



// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UiService } from 'src/app/service/ui.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
//   errorMessage: string;
//   form: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private auth: AuthService,
//     private router: Router,
//     private ui: UiService
//   ) {
//     this.form = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });
//   }

//   onSubmitFormLogin() {
//     if (this.form.invalid) {
//       return;
//     }

//     // Enable load screen
//     this.ui.activateLoading();

//     this.auth.authenticate(this.form.value).subscribe({
//       next: (result) => {
//         console.log('RESULT', result);
//         // Disable load screen
//         this.ui.deactivateLoading();
//         this.errorMessage = 'Error!';
//         this.router.navigateByUrl('/home');
//       },
//       error: (error) => {
//         // Disabled load screen
//         this.ui.deactivateLoading();

//         if (error.status === 401) {
//           this.errorMessage =
//             'No user account is associated with this email address...';

//           return;
//         }
//         this.errorMessage =
//           'Something is wrong... Please try again in a few minutes.';
//       },
//     });
//   }