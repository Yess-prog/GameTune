import { NgFor, NgIf, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameServiceService } from '../services/game-service.service';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-space',
  imports: [NgFor],
  templateUrl: './admin-space.component.html',
  styleUrl: './admin-space.component.css'
})
export class AdminSpaceComponent {
  games:any[]=[];
  users:any[]=[];
  ventes:any[]=[];
   constructor(private gameService: GameServiceService,private scroller: ViewportScroller
    ,private adminService:AdminServiceService
   ) {}
  
    ngOnInit() {
      this.gameService.getAllGames().subscribe((data) => {
        this.games = data;
      });
      this.adminService.getAllUsers().subscribe((data)=>{
        this.users=data;
      })
      this.adminService.getAllSales().subscribe((data)=>{
        this.ventes=data;
      })
    }
    
  scrollToSection(sectionId: string) {
    this.scroller.scrollToAnchor(sectionId);
  }
  delete(idU:any){
    this.adminService.deleteU(idU).subscribe({
    next: res => {
      console.log('Deleted successfully', res);
       window.location.reload();
    },
    error: err => console.error('Delete error', err)
  });
  }
  deleteS(idV:any){
    this.adminService.deleteV(idV).subscribe({
    next: res => {
      console.log('Deleted successfully', res);
      window.location.reload();
    },
    error: err => console.error('Delete error', err)
  });
  }
}
