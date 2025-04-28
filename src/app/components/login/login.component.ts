import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
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
      this.router.navigate(['/main']); //*
    } else {
      localStorage.clear();
    }
  }
}
