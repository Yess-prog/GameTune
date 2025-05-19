import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-ps5',
  imports: [NgIf,NgFor],
  templateUrl: './ps5.component.html',
  styleUrl: './ps5.component.css'
})
export class Ps5Component {
 games: any[] = [];
user?:User|null;
  constructor(private gameService: GameServiceService,private cartService:CartService,private auth:AuthService) {}

  ngOnInit() {
    this.gameService.getAllGamesps5().subscribe((data) => {
      this.games = data;
    });
    this.user=this.auth.getUser();
  }
  addToCart(game: any) {
    // Directly pass the game object if that’s expected by the service
    this.cartService.addToCart(game, this.user?.idU, game.prix,game.idG);
  }
  
}
