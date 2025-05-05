import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-adventure',
  imports: [NgIf,NgFor],
  templateUrl: './adventure.component.html',
  styleUrl: './adventure.component.css'
})
export class AdventureComponent {
  games: any[] = [];
  
    constructor(private gameService: GameServiceService,private cartService:CartService) {}
  
    ngOnInit() {
      this.gameService.getAllGamesadventure().subscribe((data) => {
        this.games = data;
      });
    }
    addToCart(game: any) {
      this.cartService.addToCart(game);
    }
}
