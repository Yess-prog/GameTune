import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Game } from '../models/game.model';
interface game{

}
@Component({
  selector: 'app-games',
  imports: [NgFor,NgIf],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {
  games: any[] = [];

  constructor(private gameService: GameServiceService,private cartService:CartService) {}

  ngOnInit() {
    this.gameService.getAllGames().subscribe((data) => {
      this.games = data;
    });
  }
  addToCart(game: Game) {
    this.cartService.addToCart(game);
  }
}
