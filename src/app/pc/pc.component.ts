import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-pc',
  imports: [NgIf,NgFor],
  templateUrl: './pc.component.html',
  styleUrl: './pc.component.css'
})
export class PcComponent {
   games: any[] = [];
  user?:User|null;
    constructor(private gameService: GameServiceService,private cartService:CartService,private auth:AuthService) {}
  
    ngOnInit() {
      this.gameService.getAllGamespc().subscribe((data) => {
        this.games = data;
      });
      this.user=this.auth.getUser();
    }
    addtoCart(game: any) {
      // Directly pass the game object if that’s expected by the service
      this.cartService.addToCart(game, this.user?.idU, game.prix,game.idG);
    }
    
}
