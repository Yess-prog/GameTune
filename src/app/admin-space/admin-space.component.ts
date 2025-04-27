import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-space',
  imports: [RouterLink,NgIf],
  templateUrl: './admin-space.component.html',
  styleUrl: './admin-space.component.css'
})
export class AdminSpaceComponent {
  gestion=false;
  vente=false;
  public  toggleGetion() {
    this.gestion=!this.gestion;
    
  }
  toggleVente(){
    this.vente=!this.vente;
  }
}
