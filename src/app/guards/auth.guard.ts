import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('isManagerLoggedIn') === 'true';
  if (!isLoggedIn) {
    router.navigateByUrl('/manager/login');
  }
  return isLoggedIn;
};
