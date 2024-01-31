import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Credentials } from './credentials';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from '../model/UserToken';

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
  userToken: UserToken | null = null;
  redirectUrl: string;
  authState = new BehaviorSubject<boolean>(false); // Create an instance of the BehaviorSubject class in the authState property of the AuthService class

  constructor(
    private http: HttpClient,
  ) {
    const token = this.getToken();
    if (token) {
      this.authState.next(true);
      this.userToken = this.getUserFromToken();
    }
  }

  // Register a new user account
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
        this.userToken = this.getUserFromToken();
        return result;
      }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  // Check if the user has admin roles
  isAdmin() {
    return this.userToken?.roles.includes('ROLE_ADMIN');
  }

  // User disconnect: delete token
  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
    this.userToken = null;
    // this.http.delete('token');
  }

  // Get the token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Extract user data from the token
  getUserFromToken() {
    console.log('get user from token');
    console.log(this.isAuthenticated());
    if (!this.isAuthenticated()) return null
    const token = this.getToken()
    if (!token) return null
    const userData = JSON.parse(atob(token.split('.')[1])) as UserToken
    // console.log(userData);
    return userData
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.authState.getValue();
  }

  // Get decoded user data from the token
  getUserData(): any | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  }
}



// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { environment } from '../../environment/environment';
// import { Credentials } from './credentials';
// import { jwtDecode } from 'jwt-decode';
// import { UserToken } from '../model/user-token';

// // URL aliases from environment.ts
// const USERS_API = environment.BASE_URL + environment.USERS_API;
// const AUTH_API = environment.BASE_URL + environment.AUTH_API;

// // Answer from authentication API
// interface AuthResponse {
//   token: string;
// }

// @Injectable({
//   providedIn: 'root',
// })

// export class AuthService {
//   isLoggedIn: boolean = false;
//   userToken: UserToken | null = null;
//   redirectUrl: string;
//   authState = new BehaviorSubject<boolean>(false);

//   constructor(
//     private http: HttpClient,
//     ) {
//       const token = this.getToken();
//       if (token) {
//         this.authState.next(true);
//         this.userToken = this.getUserFromToken();
//       }
//     }

//   register(account: { email: string; password: string; fullName: string }) {
//     return this.http.post(USERS_API, account);
//   }

//   // Authentication is a default asynchronous operation, we need to use an Observable
//   authenticate(credentials: Credentials): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(AUTH_API, credentials).pipe(
//       map((result: AuthResponse) => {
//         console.log('RESULT TOKEN', result.token);
//         console.log('JWT DECODE TEST', jwtDecode(result.token));
//         localStorage.setItem('token', result.token);
//         this.isLoggedIn = true;
//         this.authState.next(true);
//         this.userToken = this.getUserFromToken();
//         return result;
//       }),
//       catchError((error: any) => {
//         throw new Error(error);
//       })
//     );
//   }

//   isAdmin() {
//     return this.userToken?.roles.includes('ROLE_ADMIN');
//   }

//   // User disconnect: delete token
//   logout() {
//     localStorage.removeItem('token');
//     this.authState.next(false);
//     this.userToken = null;
//     // this.http.delete('token');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getUserFromToken() {
//     console.log('get user from token');
//     console.log(this.isAuthenticated());
//     if (!this.isAuthenticated()) return null
//     const token = this.getToken()
//     if (!token) return null
//     const userData = JSON.parse(atob(token.split('.')[1])) as UserToken
//     // console.log(userData);
//     return userData
// }

//   isAuthenticated(): boolean {
//     return this.authState.getValue();
//   }

//   getUserData(): any | null {
//     const token = this.getToken();
//     if (!token) {
//       return null;
//     }
//     return jwtDecode(token);
//   }
// }
