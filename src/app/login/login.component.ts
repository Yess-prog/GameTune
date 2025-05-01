import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[RouterLink]
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.isLoading = true;

    this.http.post<{ token: string; role: string }>('http://localhost:3000/login', this.credentials)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);

          if (response.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['']);
          }

          alert(`Welcome ${this.credentials.username}!`);
        },
        error: (error) => {
          alert('Login failed: ' + error.error.message);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
