import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('isManagerLoggedIn') === 'true';
  return isLoggedIn || router.parseUrl('/manager');
};
