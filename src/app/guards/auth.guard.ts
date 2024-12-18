import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = sessionStorage.getItem('isManagerLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigateByUrl('/manager/login');
    }
    return isLoggedIn;
  }
}
