import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-sprots',
  imports: [NgIf,NgFor],
  templateUrl: './sprots.component.html',
  styleUrl: './sprots.component.css'
})
export class SprotsComponent {

  games: any[] = [];
  
    constructor(private gameService: GameServiceService,private cartService:CartService) {}
  
    ngOnInit() {
      this.gameService.getAllGamesports().subscribe((data) => {
        this.games = data;
      });
    }
    addToCart(game: any) {
      this.cartService.addToCart(game);
    }
}
