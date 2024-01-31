import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService // AuthService Dependency Injection that gives a token as needed
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the user is not authenticated
    if (!this.auth.isAuthenticated()) {
      // If not authenticated, proceed with the original request
      return next.handle(req);
    }

    // If authenticated, retrieve the token from the AuthService
    const token = this.auth.getToken();

    // Clone the request and add the Authorization and Bearer headers with the token
    const clonedReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + token),
    });

    // Proceed with the modified request
    return next.handle(clonedReq);
  }
}





// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable()

// export class AuthInterceptor implements HttpInterceptor {

//   constructor(
//     private auth: AuthService // AuthService Dependency Injection that gives a token as needed
//   ) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (!this.auth.isAuthenticated()) {
//       return next.handle(req);
//     }
//     const token = this.auth.getToken();
//     const clonedReq = req.clone({
//       headers: req.headers.append('Authorization', 'Bearer ' + token),
//     });

//     return next.handle(clonedReq);
//   }
// }
