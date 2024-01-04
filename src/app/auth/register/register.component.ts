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
  error = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      plainPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  handleSubmit() {
    this.ui.activateLoading();

    if (this.form.invalid) {
      this.ui.deactivateLoading();
      return;
    }

    this.auth.register(this.form.value).subscribe(
      () => {
        this.ui.deactivateLoading();
        this.router.navigateByUrl('/login');
      },
      (httpError: HttpErrorResponse) => {
        this.ui.deactivateLoading();

        if (httpError.status === 400) {
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
        // Else
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

//     if (
//       this.form.invalid ||
//       !this.form.value.email ||
//       !this.form.value.password ||
//       !this.form.value.fullName ||
//       !this.form.value.plainPassword
//     ) {
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