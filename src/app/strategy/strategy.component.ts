import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-strategy',
  imports: [NgIf,NgFor],
  templateUrl: './strategy.component.html',
  styleUrl: './strategy.component.css'
})
export class StrategyComponent {
    games: any[] = [];
    user?:User|null;
      constructor(private gameService: GameServiceService,private cartService:CartService,private auth:AuthService) {}
    
      ngOnInit() {
        this.gameService.getAllGamestrategy().subscribe((data) => {
          this.games = data;
        });
        this.user=this.auth.getUser();
      }
      addToCart(game: any) {
        this.cartService.addToCart(game.nom,this.user?.idU,game.prix,game.idG);
      }
  }

