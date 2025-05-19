import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-sprots',
  imports: [NgIf,NgFor],
  templateUrl: './sprots.component.html',
  styleUrl: './sprots.component.css'
})
export class SprotsComponent {

  games: any[] = [];
  user?:User|null;
  
    constructor(private gameService: GameServiceService,private cartService:CartService,private auth:AuthService) {}
  
    ngOnInit() {
      this.gameService.getAllGamesports().subscribe((data) => {
        this.games = data;
      });
      this.user=this.auth.getUser();
    }
    addToCart(game: any,prix:any,userID:any) {
      this.cartService.addToCart(game.nom,userID,prix,game.idG);
    }
}
