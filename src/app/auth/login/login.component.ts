import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  message: string = 'Status: Disconnect';
  name: string;
  password: string;
  auth: AuthService;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  
  ngOnInit() {
    this.auth = this.authService;
  }
  
  setMessage() {
    if(this.auth.isLoggedIn){
      this.message = 'Connexion status: connected';
    } else {
      this.message = 'Wrong id or password!';
    }
  }
  
  login() {
    this.message = 'Connexion ongoing...';
    this.auth.logIn(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if(isLoggedIn){
          this.router.navigate(['/figurine']);
        } else {
          this.password = '';
          this.router.navigate(['/login']);
        }
      })
  }
  
  logout() {
    this.auth.logOut();
    this.message = 'Disconnected';
  }  
}
