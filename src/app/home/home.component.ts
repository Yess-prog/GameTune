import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';

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
    user?:User|null = null;
    chart:any[]=[];
    
      constructor(private gameService: GameServiceService,private router:Router,private cartService : CartService,private auth:AuthService) {}
    
      ngOnInit() {
         this.auth.currentUser$.subscribe(user => {
    this.user = user;
  });
  
  this.gameService.getAllGames().subscribe((data) => {
    this.games = data.slice(0, 4);
  });
  
      }
      gotogame( id:any){
        this.router.navigate(["/desc",id]);
      }
      addToCart(game: Game) {
        const userC = this.auth.getUser();
        this.cartService.addToCart(game.nom,userC?.idU,game.prix,game.idG);
        
      }
      
      
}
