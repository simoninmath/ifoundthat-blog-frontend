import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;

  // Login is a default asynchronous operation, so we need to use Observable
  logIn(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name == 'fig' && password == 'fig');
  
  // Simulate server answer with delay
  return of(isLoggedIn).pipe(
    delay(1000),
    tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
  );
}

  logOut() {
    this.isLoggedIn = false;
  }
}
