import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

// Refactored with Guard Function and inject(), 
// because CanActivate class is now depreciated
export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('auth guard');
  if(authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;

}