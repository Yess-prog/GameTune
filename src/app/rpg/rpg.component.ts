import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-rpg',
  imports: [NgIf,NgFor],
  templateUrl: './rpg.component.html',
  styleUrl: './rpg.component.css'
})
export class RpgComponent {
  games: any[] = [];
  user?:User|null;
    constructor(private gameService: GameServiceService,private cartService:CartService,private auth:AuthService) {}
  
    ngOnInit() {
      this.gameService.getAllGamesrpg().subscribe((data) => {
        this.games = data;
      });
      this.user=this.auth.getUser();
    }
    addToCart(game: any) {
      this.cartService.addToCart(game.nom,this.user?.idU,game.prix,game.idG);
    }
}
