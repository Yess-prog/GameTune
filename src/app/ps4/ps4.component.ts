import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-ps4',
  imports: [NgIf,NgFor],
  templateUrl: './ps4.component.html',
  styleUrl: './ps4.component.css'
})
export class Ps4Component {
 games: any[] = [];

  constructor(private gameService: GameServiceService,private cartService:CartService) {}

  ngOnInit() {
    this.gameService.getAllGamesps4().subscribe((data) => {
      this.games = data;
    });
  }
  addToCart(game: any) {
    this.cartService.addToCart(game);
  }
}
