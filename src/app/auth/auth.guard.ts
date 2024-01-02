import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

// Refactored with Guard Function and inject(), 
// because CanActivate class is now depreciated
export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn) {
    return true;
  }

  router.navigate(['/login']);
  return false;

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   if (this.auth.isAuthenticated()) {
  //     return true;
  //   }
  //   this.router.navigateByUrl('/login');
  //   return false;
  // }

}