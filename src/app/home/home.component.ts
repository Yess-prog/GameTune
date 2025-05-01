import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameServiceService } from '../services/game-service.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    NotIn=true;
    isLoggedIN=false;
    
    toggleMenu() {
      this.NotIn = !this.isLoggedIN;  // Toggle the visibility of the dropdown
    }
    games: any[] = [];
    
      constructor(private gameService: GameServiceService) {}
    
      ngOnInit() {
        this.gameService.getAllGames().subscribe((data) => {
          this.games = data.slice(0,4);
        });
      }
}
