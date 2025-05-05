import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-x360',
  imports: [NgIf,NgFor],
  templateUrl: './x360.component.html',
  styleUrl: './x360.component.css'
})
export class X360Component {
 games: any[] = [];

  constructor(private gameService: GameServiceService,private cartService:CartService) {}

  ngOnInit() {
    this.gameService.getAllGamesx360().subscribe((data) => {
      this.games = data;
    });
  }
  addToCart(game: any) {
    this.cartService.addToCart(game);
  }
}
