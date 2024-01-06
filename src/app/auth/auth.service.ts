import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Credentials } from './credentials';
import { jwtDecode } from 'jwt-decode';

// URL from
const USERS_API = environment.USERS_API;
const AUTH_API = environment.AUTH_API;

// Answer from authentication API
interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;
  authState = new Subject<boolean>();

  constructor(
    private http: HttpClient, 
    private storage: Storage) {}

  // Because login is a default asynchronous operation, we need to use an Observable
  logIn(email: string, password: string): Observable<boolean> {
    const isLoggedIn = email == 'admin@admin.com' && password == 'admin';
    // Simulate server answer with delay
    return of(isLoggedIn).pipe(
      delay(1000),
      tap((isLoggedIn) => (this.isLoggedIn = isLoggedIn))
    );
  }

  logOut() {
    this.isLoggedIn = false;
  }

  register(account: { email: string; password: string; fullName: string }) {
    return this.http.post(USERS_API, account);
  }

  authenticate(credentials: Credentials) {
    return this.http.post<AuthResponse>(AUTH_API, credentials).pipe(
      map((result: AuthResponse) => {
        this.storage.setItem('token', result.token);
        this.authState.next(true);
        return result;
      }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  // User disconnect
  logout() {
    this.storage.removeItem('token');
    this.authState.next(false);
  }

  getToken(): string | null {
    return this.storage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserData(): any | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  }
}
