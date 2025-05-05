import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

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
    this.currentUserSubject.next(user);
  }
  
  getUser(): User | null {
    return this.currentUserSubject.value;
  }
  
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
  
}
