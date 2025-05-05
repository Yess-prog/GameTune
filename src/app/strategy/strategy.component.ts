import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-strategy',
  imports: [NgIf,NgFor],
  templateUrl: './strategy.component.html',
  styleUrl: './strategy.component.css'
})
export class StrategyComponent {
    games: any[] = [];
    
      constructor(private gameService: GameServiceService,private cartService:CartService) {}
    
      ngOnInit() {
        this.gameService.getAllGamestrategy().subscribe((data) => {
          this.games = data;
        });
      }
      addToCart(game: any) {
        this.cartService.addToCart(game);
      }
  }

