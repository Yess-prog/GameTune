import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { NgFor, NgIf } from '@angular/common';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,NgIf,NgFor],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
// app.component.ts
export class AppComponent implements OnInit {
  cartVisible = false;
  cartItems: any[] = [];

  user: User | null = null;
currentUser$?: Observable<User | null>;
  constructor(private authService: AuthService, private Router: Router, private cdr: ChangeDetectorRef,private cartService: CartService) {
    
  }






  ngOnInit() {

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    // Check the current session status when the app loads
    this.authService.checkSession().subscribe((response) => {
      if (response.loggedIn && response.user) {
        this.authService.setUser(response.user);
        this.user = response.user;
      }
    });

    // Subscribe to the current user observable to update the navbar
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }
  pay(){

  }
  toggleCart() {
    this.cartVisible = !this.cartVisible;
    
  }



logout() {
  this.authService.logout().subscribe(() => {
    this.authService.setUser(null);
    alert("you have logged out");
    this.Router.navigate(['']);
  });
}
}
