import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameServiceService } from '../services/game-service.service';
import { CartService } from '../services/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-description',
  imports: [NgIf,NgFor],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  games: any[] = [];
  comments:any[]=[];
  comment:string="";
  user?:User|null;
  constructor(private route: ActivatedRoute, private gameService:GameServiceService,private cartService : CartService,private auth:AuthService,private router:Router ) {}
  

ngOnInit() {
  
  const gameId = Number(this.route.snapshot.paramMap.get('id'));
  this.gameService.getGame(gameId).subscribe((data) => {
    this.games = [data];  // Wrap the game object in an array if you need to use NgFor in the template
  });
  this.gameService.getComments(gameId).subscribe((dataC) => {
    this.comments=dataC;
  });
  this.user=this.auth.getUser();
  console.log(this.comments);

}
addToCart(game: any) {
  this.cartService.addToCart(game.nom,this.user?.idU,game.prix,game.idG);
}
submitComment(game:any){
  if(this.user===null){
    this.router.navigate(['/login']);
  }else{
  this.gameService.submitComment(this.user!.idU,game.idG,this.comment);}
  
}
}
