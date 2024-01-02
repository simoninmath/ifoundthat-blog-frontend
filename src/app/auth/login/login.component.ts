import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  errorMessage: string;
  form: FormGroup;

  // form = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', Validators.required)
  // });

  // constructor(
  //   private auth: AuthService,
  //   private router: Router,
  //   private ui: UiService
  // ) {}
  
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  handleSubmit() {
    if (this.form.invalid || !this.form.value.email || !this.form.value.password) {
      return;
    }

    // Active l'écran de chargement
    this.ui.activateLoading();

    this.auth.authenticate(this.form.value).subscribe(
      resultat => {
        // Désactive l'écran de chargement
        this.ui.deactivateLoading();
        this.errorMessage = '';
        this.router.navigateByUrl('/articles');
      },
      error => {
        // Désactive l'écran de chargement
        this.ui.deactivateLoading();

        if (error.status === 401) {
          this.errorMessage =
            'Nous n\'avons pas trouvé de compte utilisateur qui corresponde avec cet email et ce mot de passe';

          return;
        }

        this.errorMessage =
          'Un problème est survenu, veuillez ré-essayer plus tard';
      }
    );
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
