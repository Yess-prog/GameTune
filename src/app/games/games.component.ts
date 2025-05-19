import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';
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
  user?:User|null;
  constructor(private gameService: GameServiceService,private cartService:CartService,private auth:AuthService) {}

  ngOnInit() {
    this.gameService.getAllGames().subscribe((data) => {
      this.games = data;
    });
    this.user=this.auth.getUser();
  }
  addToCart(game: Game) {
    this.cartService.addToCart(game.nom,this.user?.idU,game.prix,game.idG);
  }
}
