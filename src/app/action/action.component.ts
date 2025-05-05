import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-action',
  imports: [NgIf,NgFor],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent {
  games: any[] = [];
  
    constructor(private gameService: GameServiceService ,private cartService:CartService) {}
  
    ngOnInit() {
      this.gameService.getAllGamesaction().subscribe((data) => {
        this.games = data;
      });
    }
    addToCart(game: any) {
      this.cartService.addToCart(game);
    }
}
