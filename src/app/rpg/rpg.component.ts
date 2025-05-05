import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-rpg',
  imports: [NgIf,NgFor],
  templateUrl: './rpg.component.html',
  styleUrl: './rpg.component.css'
})
export class RpgComponent {
  games: any[] = [];
  
    constructor(private gameService: GameServiceService,private cartService:CartService) {}
  
    ngOnInit() {
      this.gameService.getAllGamesrpg().subscribe((data) => {
        this.games = data;
      });
    }
    addToCart(game: any) {
      this.cartService.addToCart(game);
    }
}
