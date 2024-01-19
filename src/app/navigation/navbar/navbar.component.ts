import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  isLogin(): any {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  getUser(){
    this.authService.getUserFromToken();
  }
}
