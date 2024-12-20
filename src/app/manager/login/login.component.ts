import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'manager-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = inject(FormBuilder).group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage = '';
  private router = inject(Router);

  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (username === 'manager' && password === 'Testmanager1@') {
      sessionStorage.setItem('isManagerLoggedIn', 'true');
      this.router.navigateByUrl('/manager/home');
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
