import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {
     const storedUser = localStorage.getItem('user');
  if (storedUser) {
    this.currentUserSubject.next(JSON.parse(storedUser));
  }
  }

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  

  login(credentials: any) {
    return this.http.post<{ success: boolean, user: any }>(
      'http://localhost:3000/login',
      credentials,
      { withCredentials: true }
    );
  }
  
  checkSession() {
    return this.http.get<{ loggedIn: boolean, user?: any }>(
      'http://localhost:3000/session',
      { withCredentials: true }
    );
  }
  
  logout() {
    return this.http.post('http://localhost:3000/logout', {}, { withCredentials: true });
  }
  setUser(user: User | null) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    console.log(user);
  }
  
  getUser(): User | null {
    console.log(this.currentUserSubject.value);
    return this.currentUserSubject.value;

  }
  
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
  
}
