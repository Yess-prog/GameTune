// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(item: any) {
    const current = this.cartItems.value;
    this.cartItems.next([...current, item]);
    console.log('Adding to cart:', item); // log
    this.cartItems.next([...current, item]);
  }

  getItems() {
    return this.cartItems.value;
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
