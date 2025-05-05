import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LoginResponse {
  success: boolean;
  user?: {
    username: string;
    role: 'admin' | 'user';
  };
  message?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterLink,NgIf,FormsModule]
})
export class LoginComponent {
  credentials = { username: '', pwd: '' };
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  submitLogin() {
    if (!this.credentials.username || !this.credentials.pwd) {
      alert('Please fill in all fields.');
      return;
    }
  
    this.isLoading = true;
  
    this.http.post<any>('http://localhost:3000/login', this.credentials).subscribe({
      next: (response) => {
        if (response.user) {
          const { username, role } = response.user;
          alert(`Welcome back, ${username}!`);
    
          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'user') {
            this.router.navigate(['/']);
          } else {
            alert('Unknown role: ' + role);
          }
        } else {
          alert('Login failed: ' + (response.message || 'Invalid credentials'));
        }
      },
      error: (error) => {
        alert('Login error: ' + (error.error?.message || 'Unknown error'));
      },
      complete: () => {
        this.isLoading = false;
      }
    });
    
  }
  
}
