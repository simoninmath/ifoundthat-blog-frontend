import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Credentials } from './credentials';
import { jwtDecode } from 'jwt-decode';

// URL aliases from environment.ts
const USERS_API = environment.BASE_URL + environment.USERS_API;
const AUTH_API = environment.BASE_URL + environment.AUTH_API;

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
  authState = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    ) {
      const token = this.getToken();
      if (token) {
        this.authState.next(true);
      }
    }

  register(account: { email: string; password: string; fullName: string }) {
    return this.http.post(USERS_API, account);
  }

  // Authentication is a default asynchronous operation, we need to use an Observable
  authenticate(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_API, credentials).pipe(
      map((result: AuthResponse) => {
        console.log('RESULT TOKEN', result.token);
        console.log('JWT DECODE TEST', jwtDecode(result.token));
        localStorage.setItem('token', result.token);
        this.isLoggedIn = true;
        this.authState.next(true);
        return result;
      }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  // User disconnect: delete token
  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
    this.http.delete('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.authState.getValue();
  }

  getUserData(): any | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  }
}
