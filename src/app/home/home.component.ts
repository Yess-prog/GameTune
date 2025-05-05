import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    NotIn=true;
    isLoggedIN=false;
    
    toggleMenu() {
      this.NotIn = !this.isLoggedIN;  // Toggle the visibility of the dropdown
    }
    games: any[] = [];
    
      constructor(private gameService: GameServiceService,private router:Router,private cartService : CartService) {}
    
      ngOnInit() {
        this.gameService.getAllGames().subscribe((data) => {
          this.games = data.slice(0,4);
        });
      }
      gotogame( id:number){
        this.router.navigate(["/description",id]);
      }
      addToCart(game: Game) {
        this.cartService.addToCart(game);
      }
}
