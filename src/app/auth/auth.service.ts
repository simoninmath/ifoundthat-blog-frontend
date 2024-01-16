import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Credentials } from './credentials';
import { jwtDecode } from 'jwt-decode';

// URL aliases from environment.ts file
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
  isLoggedIn: boolean = false; // Flag indicating whether the user is logged in
  redirectUrl: string; // URL to redirect to after successful login
  authState = new BehaviorSubject<boolean>(false); // Observable for tracking authentication state

  constructor(private http: HttpClient) {
    // Check if a token is present on service initialization
    const token = this.getToken();
    if (token) {
      this.authState.next(true); // Update authState if token is present
    }
  }

  // User registration
  register(account: { email: string; password: string; fullName: string }) {
    return this.http.post(USERS_API, account);
  }

  // User authentication
  authenticate(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_API, credentials).pipe(
      map((result: AuthResponse) => {
        // Store the token in localStorage on successful authentication
        localStorage.setItem('token', result.token);
        // Update authState to indicate user is logged in
        this.authState.next(true);
        return result;
      }),
      catchError((error: any) => {
        throw new Error(error); // Throw an error for the calling code to handle
      })
    );
  }

  // User logout
  logout() {
    localStorage.removeItem('token'); // Remove token from localStorage
    this.authState.next(false); // Update authState to indicate user is logged out
    this.http.delete('token'); // Make a request to delete the token (modify as needed)
  }

  // Get the stored token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if the user is authenticated based on authState
  isAuthenticated(): boolean {
    return this.authState.getValue();
  }

  // Decode and return user data from the stored token
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
// import { catchError,  map } from 'rxjs/operators';
// import { environment } from '../../environment/environment';
// import { Credentials } from './credentials';
// import { jwtDecode } from 'jwt-decode';

// // URL aliases from environment.ts file
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
//   redirectUrl: string;
//   authState = new BehaviorSubject<boolean>(false);

//   constructor(
//     private http: HttpClient,
//     ) {
//       const token = this.getToken();
//       if (token) {
//         this.authState.next(true);
//       }
//     }

//   register(account: { email: string; password: string; fullName: string }) {
//     return this.http.post(USERS_API, account);
//   }

//   authenticate(credentials: Credentials): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(AUTH_API, credentials).pipe(
//       map((result: AuthResponse) => {
//         // console.log('RESULT TOKEN', result.token);
//         // console.log('JWT DECODE TEST', jwtDecode(result.token));
//         localStorage.setItem('token', result.token);
//         this.authState.next(true);
//         return result;
//       }),
//       catchError((error: any) => {
//         throw new Error(error);
//       })
//     );
//   }

//   // User disconnect
//   logout() {
//     localStorage.removeItem('token');
//     this.authState.next(false);
//     this.http.delete('token');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

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
