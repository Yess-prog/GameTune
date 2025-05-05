import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameServiceService } from '../services/game-service.service';

@Component({
  selector: 'app-admin-space',
  imports: [RouterLink,NgFor],
  templateUrl: './admin-space.component.html',
  styleUrl: './admin-space.component.css'
})
export class AdminSpaceComponent {
  games:any[]=[];
   constructor(private gameService: GameServiceService) {}
  
    ngOnInit() {
      this.gameService.getAllGames().subscribe((data) => {
        this.games = data;
      });
    }
}
