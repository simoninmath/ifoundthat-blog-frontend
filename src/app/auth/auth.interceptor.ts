import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService // Service for authentication and token retrieval
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the user is not authenticated
    if (!this.auth.isAuthenticated()) {
      // If not, pass the request without modification
      return next.handle(req);
    }

    // If authenticated, retrieve the token
    const token = this.auth.getToken();

    // Clone the request and add the Authorization header with the token
    const clonedReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + token),
    });

    // Pass the modified request to the next handler
    return next.handle(clonedReq);
  }
}