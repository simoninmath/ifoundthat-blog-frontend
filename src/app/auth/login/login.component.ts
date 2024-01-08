import { Component, OnInit } from '@angular/core';
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

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  handleSubmit() {
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
        this.errorMessage = 'Error!';
        this.router.navigateByUrl('/articles');
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
          'Something is wrong... Please try again in a few minutes.';
      },
    });
  }

  // message: string = 'Status: Disconnect';
  // name: string;
  // password: string;
  // auth: AuthService;

  // constructor(
  //   private authService: AuthService,
  //   private router: Router
  // ){}

  // ngOnInit() {
  //   this.auth = this.authService;
  // }

  // setMessage() {
  //   if(this.auth.isLoggedIn){
  //     this.message = 'Connexion status: connected';
  //   } else {
  //     this.message = 'Wrong id or password!';
  //   }
  // }

  // login() {
  //   this.message = 'Connexion ongoing...';
  //   this.auth.logIn(this.name, this.password)
  //     .subscribe((isLoggedIn: boolean) => {
  //       this.setMessage();
  //       if(isLoggedIn){
  //         this.router.navigate(['/figurine']);
  //       } else {
  //         this.password = '';
  //         this.router.navigate(['/login']);
  //       }
  //     })
  // }

  // logout() {
  //   this.auth.logOut();
  //   this.message = 'Disconnected';
  // }
}
