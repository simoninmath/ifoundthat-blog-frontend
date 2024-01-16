import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

// Refactored with Guard Function and inject(),
// because CanActivate class is now deprecated
export const AuthGuard = () => {
  // Inject the AuthService and Router using the inject function
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in
  if (authService.isLoggedIn) {
    return true; // Allow access to the route
  }

  // If not logged in, navigate to the login page and deny access
  router.navigate(['/login']);
  return false;
}