import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-x360',
  imports: [NgIf,NgFor],
  templateUrl: './x360.component.html',
  styleUrl: './x360.component.css'
})
export class X360Component {
 games: any[] = [];
user?:User|null;
  constructor(private gameService: GameServiceService,private cartService:CartService,private auth:AuthService) {}

  ngOnInit() {
    this.gameService.getAllGamesx360().subscribe((data) => {
      this.games = data;
    });
    this.user=this.auth.getUser();
  }
  addToCart(game: any) {
    this.cartService.addToCart(game.nom,this.user?.idU,game.prix,game.idG);
  }
}
