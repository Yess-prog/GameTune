// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class CartService {
  constructor(private http:HttpClient){};
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();
  
addToCart(item: any, userID: any, prix: any, idG: any) {
  console.log('Adding to cart:', item, userID);
  this.saveItems(item, userID, prix, idG).subscribe(() => {
    this.getAllItems(userID).subscribe(itemsFromDb => {
      this.cartItems.next(itemsFromDb);
    });
  });
}

  getItems() {
    return this.cartItems.value;
  }
   getAllItems(idU:any){
    return this.http.get<any[]>('http://localhost:3000/Items',{params:{idU}});
  }

  clearCart(user:number) {
    return this.http.post("http://localhost:3000/clearCart",{ idU: user });
  }
  saveItems(game:any,userID:any,prix:any,idG:any){
    const chart={game,userID,prix,idG};
    console.log(chart);
    return this.http.post("http://localhost:3000/saveItems",chart);
  }
}
