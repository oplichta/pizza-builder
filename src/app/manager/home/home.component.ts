import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'manager-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    sessionStorage.removeItem('isManagerLoggedIn');
    this.router.navigateByUrl('/manager/login');
  }
}
