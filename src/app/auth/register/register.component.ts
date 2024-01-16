import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from 'src/app/service/ui.service';
import { Violation } from '../violation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error = false; // Flag to indicate a general error
  form: FormGroup; // Angular Reactive Form for registration inputs

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
      fullName: ['', Validators.required],
      plainPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  // Function triggered on form submission
  handleSubmit() {
    this.ui.activateLoading(); // Enable loading screen

    if (this.form.invalid) {
      this.ui.deactivateLoading();
      return; // Stop execution if form is invalid
    }

    // Call the authentication service to register
    this.auth.register(this.form.value).subscribe(
      () => {
        // Disable loading screen
        this.ui.deactivateLoading();
        // Navigate to the login page on successful registration
        this.router.navigateByUrl('/login');
      },
      (httpError: HttpErrorResponse) => {
        // Disable loading screen
        this.ui.deactivateLoading();

        if (httpError.status === 400) {
          // Handle validation errors (violations) returned by the API
          const violations = httpError.error.violations as Violation[];

          for (const apiViolation of violations) {
            const control = this.form.get(apiViolation.propertyPath);
            if (control) {
              control.setErrors({
                violation: apiViolation.message,
              });
            }
          }
          return;
        }
        // Handle other errors
        this.error = true;
      }
    );
  }
}



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
// import { UiService } from 'src/app/service/ui.service';
// import { Violation } from '../violation';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss'],
// })
// export class RegisterComponent implements OnInit {
//   error = false;
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
//       fullName: ['', Validators.required],
//       plainPassword: ['', Validators.required],
//     });
//   }

//   ngOnInit() {}

//   handleSubmit() {
//     this.ui.activateLoading();

//     if (this.form.invalid) {
//       this.ui.deactivateLoading();
//       return;
//     }

//     this.auth.register(this.form.value).subscribe(
//       () => {
//         this.ui.deactivateLoading();
//         this.router.navigateByUrl('/login');
//       },
//       (httpError: HttpErrorResponse) => {
//         this.ui.deactivateLoading();

//         if (httpError.status === 400) {
//           const violations = httpError.error.violations as Violation[];

//           for (const apiViolation of violations) {
//             const control = this.form.get(apiViolation.propertyPath);
//             if (control) {
//               control.setErrors({
//                 violation: apiViolation.message,
//               });
//             }
//           }
//           return;
//         }
//         // Else
//         this.error = true;
//       }
//     );
//   }
// }