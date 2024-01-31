import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

// Refactored with Guard Function and inject(), 
// because CanActivate class is now deprecated
export const AuthGuard = () => {
  const authService = inject(AuthService);  // Make DI with inject() method
  const router = inject(Router);

  // Check if the user is authenticated using the AuthService
  if(authService.isAuthenticated()) {
    console.log('AUTH GUARD', authService);
    // If authenticated, allow access to the route
    return true;
  }

  // If not authenticated, navigate to the login page and deny access
  router.navigate(['/login']);
  return false;
}


// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from './auth.service';

// // Refactored with Guard Function and inject(), 
// // because CanActivate class is now depreciated
// export const AuthGuard = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   console.log('auth guard');
//   if(authService.isAuthenticated()) {
//     return true;
//   }

//   router.navigate(['/login']);
//   return false;

// }