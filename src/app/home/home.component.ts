import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    NotIn=true;
    isLoggedIN=false;
    toggleMenu() {
      this.NotIn = !this.isLoggedIN;  // Toggle the visibility of the dropdown
    }
}
