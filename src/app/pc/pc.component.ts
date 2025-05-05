import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-pc',
  imports: [NgIf,NgFor],
  templateUrl: './pc.component.html',
  styleUrl: './pc.component.css'
})
export class PcComponent {
   games: any[] = [];
  
    constructor(private gameService: GameServiceService,private cartService:CartService) {}
  
    ngOnInit() {
      this.gameService.getAllGamespc().subscribe((data) => {
        this.games = data;
      });
    }
    addToCart(game: any) {
      this.cartService.addToCart(game);
    }
}
