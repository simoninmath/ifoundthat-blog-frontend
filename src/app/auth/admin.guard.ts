import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AdminGuard = () => {
  const authService = inject(AuthService);  // Dependency Injection using inject() method
  const router = inject(Router);

  // Check if the user is authenticated as an admin using the AuthService
  if(authService.isAdmin()){
    // If authenticated as an admin, allow access to the route
    return true;
  }

  // If not authenticated as an admin, navigate to the home page and deny access
  router.navigate(['/home']);
  return false;
}