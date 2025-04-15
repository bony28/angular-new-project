import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div
      style="max-width: 400px; margin: 100px auto; padding: 2rem; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); font-family: 'Segoe UI', sans-serif;"
    >
      <h1 style="text-align: center; margin-bottom: 1.5rem; color: #333;">
        Login
      </h1>

      <div style="margin-bottom: 1.2rem;">
        <label
          for="username"
          style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555;"
          >User Name</label
        >
        <input
          type="text"
          id="username"
          style="width: 100%; padding: 0.6rem 0.8rem; border: 1px solid #ccc; border-radius: 8px; font-size: 1rem; outline: none;"
          [ngModel]="username()"
          (ngModelChange)="username.set($event)"
        />
      </div>

      <div style="margin-bottom: 1.2rem;">
        <label
          for="password"
          style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555;"
          >Password</label
        >
        <input
          type="password"
          id="password"
          style="width: 100%; padding: 0.6rem 0.8rem; border: 1px solid #ccc; border-radius: 8px; font-size: 1rem; outline: none;"
          [ngModel]="password()"
          (ngModelChange)="password.set($event)"
        />
      </div>

      <button
        style="width: 100%; padding: 0.75rem; background-color: #4f46e5; color: #fff; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;"
        onmouseover="this.style.backgroundColor='#4338ca'"
        onmouseout="this.style.backgroundColor='#4f46e5'"
        (click)="handleLogin()"
      >
        Login
      </button>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  username = signal<string>('');
  password = signal<string>('');

  router = inject(Router);
  handleLogin() {
    if (this.username() === 'admin' && this.password() === 'admin') {
      localStorage.setItem(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IlN1cGVyVXNlciIsImlhdCI6MTY4NTY1NzYwMCwiZXhwIjoxNzE3MTkzNjAwfQ.'
      );
      this.router.navigate(['/main']);
    } else {
      localStorage.clear();
    }
  }
}
