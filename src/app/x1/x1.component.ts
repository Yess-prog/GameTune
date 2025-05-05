import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-x1',
  imports: [NgIf,NgFor],
  templateUrl: './x1.component.html',
  styleUrl: './x1.component.css'
})
export class X1Component {
   games: any[] = [];
  
    constructor(private gameService: GameServiceService,private cartService:CartService) {}
  
    ngOnInit() {
      this.gameService.getAllGamesxone().subscribe((data) => {
        this.games = data;
      });
    }
    addToCart(game: any) {
      this.cartService.addToCart(game);
    }
}
