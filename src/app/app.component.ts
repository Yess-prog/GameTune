import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { NgIf } from '@angular/common';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,NgIf],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
// app.component.ts
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private Router: Router, private cdr: ChangeDetectorRef) {}


user: User | null = null;




ngOnInit() {
  this.authService.checkSession().subscribe(res => {
    if (res.loggedIn) {
      this.user = res.user;
      this.cdr.detectChanges(); // <-- force Angular to update the template
      console.log(this.user);
    }
  });
}


logout() {
  this.authService.logout().subscribe(() => {
    this.user = null;
    this.Router.navigate(['']);
  });
}
}
