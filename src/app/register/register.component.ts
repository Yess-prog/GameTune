import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
interface LoginResponse {
  success: boolean;
  user?: {
    username: string;
    role: 'admin' | 'user';
  };
  message?: string;
}
@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  credentials = { username: '', pwd: '',name:'',email:'' };
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  submitRegister() {
    if (!this.credentials.username || !this.credentials.pwd || !this.credentials.name || !this.credentials.email) {
      alert('Please fill in all fields.');
      return;
    }
  
    this.isLoading = true;
    this.http.post<LoginResponse>('http://localhost:3000/register', this.credentials)
    .subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        alert('Register error: ' + (error.error?.message || 'Unknown error'));
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
