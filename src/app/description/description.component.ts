import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-description',
  imports: [NgIf,NgFor],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  games: any[] = [];
  constructor(private route: ActivatedRoute, private gameService:GameServiceService,private cartService : CartService ) {}
  

ngOnInit() {
  const  gameId =Number (this.route.snapshot.paramMap.get('id'));
  this.gameService.getGame(gameId).subscribe((data) => {
    this.games = data;
  });
}
addToCart(game: any) {
  this.cartService.addToCart(game);
}
}
