import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';

interface LoginResponse {
  success: boolean;
  user?: {
    idU:number;
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

  constructor(private http: HttpClient, private router: Router,private auth:AuthService) {}

  submitLogin() {
    if (!this.credentials.username || !this.credentials.pwd) {
      alert('Please fill in all fields.');
      return;
    }
  
    this.isLoading = true;
  
    this.http.post<LoginResponse>('http://localhost:3000/login', this.credentials, { withCredentials: true })
  .subscribe({
    next: (response) => {
      if (response.user) {
        this.auth.setUser(response.user); // <--- Set user here

        if (response.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        alert('Login failed: ' + (response.message || 'Invalid credentials'));
      }
    },
    // ...
  });

    
  }
  
}
