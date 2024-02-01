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
  errorMessage: string;
  form: FormGroup;

  // Use injection dependency to access services with constructor method
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {
    // Use formBuilder bundle to use Validators and precise regex pattern
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.maxLength(255), Validators.pattern(
                    '^[a-zA-Z0-9èâàç;,!?:\'ÉÈÊÀÇËÏÎÔÙÛÜéèêàçëïîôùûü\\s]+$'),],],});
  }

  loginSubmit() {
    // Make a condition to verify if the form is valid before take it to
    if (this.form.invalid) {
      return;
    }

    // Enable load screen
    this.ui.activateLoading();

    this.auth.authenticate(this.form.value).subscribe({
      next: (result) => {
        console.log('RESULT', result);
        // Disable load screen
        this.ui.deactivateLoading();
        // this.errorMessage = 'Error!';
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        // Disabled load screen
        this.ui.deactivateLoading();

        if (error.status === 401) {
          this.errorMessage =
            'No user account is associated with this email address...';

          return;
        }
        this.errorMessage =
          'Something\'s wrong... Please try again in a few minutes.';
      },
    });
  }

}
