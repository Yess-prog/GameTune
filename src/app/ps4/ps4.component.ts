import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-ps4',
  templateUrl: './ps4.component.html',
  styleUrls: ['./ps4.component.css'], // plural: "styleUrls",
  imports:[NgFor,NgIf]

})
export class Ps4Component implements OnInit {
  games: any[] = [];
  user!: User; // "!" means it will definitely be assigned later (in ngOnInit)

  constructor(
    private gameService: GameServiceService,
    private cartService: CartService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.gameService.getAllGamesps4().subscribe((data) => {
      this.games = data;
    });
    this.user != this.auth.getUser();
  }

  addToCart(game: any) {
    // Directly pass the game object if that’s expected by the service
    this.cartService.addToCart(game, this.user?.idU, game.prix,game.idG);
  }
  
}

