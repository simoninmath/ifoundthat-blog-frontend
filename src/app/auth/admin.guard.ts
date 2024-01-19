import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

// Refactored with Guard Function and inject(), 
// because CanActivate class is now depreciated
export const AdminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAdmin()){
    return true;
  }

  router.navigate(['/home']);
  return false;

}