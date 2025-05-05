import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-ps5',
  imports: [NgIf,NgFor],
  templateUrl: './ps5.component.html',
  styleUrl: './ps5.component.css'
})
export class Ps5Component {
 games: any[] = [];

  constructor(private gameService: GameServiceService,private cartService:CartService) {}

  ngOnInit() {
    this.gameService.getAllGamesps5().subscribe((data) => {
      this.games = data;
    });
  }
  addToCart(game: any) {
    this.cartService.addToCart(game);
  }
}
