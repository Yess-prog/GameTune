import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameServiceService {
  private apiUrl = 'http://localhost:3000/games'; 

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getAllGamesx360(){
    return this.http.get<any[]>('http://localhost:3000/gamesx360');
  }
  getAllGamesxone(){
    return this.http.get<any[]>('http://localhost:3000/gamesxone');
  }
  getAllGamesps4(){
    return this.http.get<any[]>('http://localhost:3000/gamesps4');
  }
  getAllGamesps5(){
    return this.http.get<any[]>('http://localhost:3000/gamesps5');
  }
  getAllGamespc(){
    return this.http.get<any[]>('http://localhost:3000/gamespc');
  }
  getAllGamesaction(){
    return this.http.get<any[]>('http://localhost:3000/gamesaction');
  }
  getAllGamesadventure(){
    return this.http.get<any[]>('http://localhost:3000/gamesadventure');
  }
  getAllGamesports(){
    return this.http.get<any[]>('http://localhost:3000/gamessports');
  }
  getAllGamestrategy(){
    return this.http.get<any[]>('http://localhost:3000/gamestrategy');
  }
  getAllGamesrpg(){
    return this.http.get<any[]>('http://localhost:3000/gamesrpg');
  }
  getGame(id:any){
    return this.http.get<any>(`http://localhost:3000/game/${id}`);
  }
  getComments(id:any){
    
    return this.http.get<any>(`http://localhost:3000/comments/${id}`);
  
  }
  submitComment(id:number,idG: number, comment: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/subComm`, { idG,id,comment });
  }
  getRating(id:any){
    
    return this.http.get<any>(`http://localhost:3000/rate/${id}`);
  
  }
  submitRating(id:number,idG: number, rate: number): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/subRate`, { idG,id,rate });
  }
  bought(game:Game,id : number){
    return this.http.post<any>(`http://localhost:3000/subSale`, {
    nomG: game.nom,
    idG: game.id,
    prixG: game.prix,
    idU: id
  });
  }
}
