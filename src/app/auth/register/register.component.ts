import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  error = false;
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    fullName: new FormControl(''),
    plainPassword: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get fullName() {
    return this.form.get('fullName');
  }

  get plainPassword(){
    return this.form.get('plainPassword');
  }

  handleSubmit() {
    this.ui.activateLoading();

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
            this.form.get(apiViolation.propertyPath).setErrors({
              violation: apiViolation.message
            });
          }

          return;
        }
        // Else
        this.error = true;
      }
    );
  }
}

export interface Violation {
  propertyPath: string;
  message: string;

}
