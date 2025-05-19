import {
  Stripe,
  StripeElements,
  StripeCardElement,
  loadStripe,
} from '@stripe/stripe-js';

import { Component, AfterViewInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth-service.service';
import { CartService } from '../services/cart.service';
import { GameServiceService } from '../services/game-service.service';
import { Game } from '../models/game.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payement.component.html',
  imports:[NgIf,NgFor]
})
export class PayementComponent implements AfterViewInit {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
   games: any[] = [];
  user!:User|null;
    constructor(private gameService: GameServiceService,private cartService:CartService,private auth:AuthService) {}
  
   ngOnInit(): void {
    this.user = this.auth.getUser();
    this.cartService.getAllItems(this.user?.idU).subscribe((data) => {
      this.games = data;
    });
  }
  
  async ngAfterViewInit() {
    this.stripe = await loadStripe('pk_test_51RQRLcHCMzwyqMAByIqbx0Pgyjy0AuT9hJS56fmFx8Tl8fNXAkSZFWGTWt4iqRQFLUfPvG6S68JwLfuvDzkoSM3C00tsBGuRvf');
    if (!this.stripe) return;

    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount('#card-element');

    const form = document.getElementById('payment-form') as HTMLFormElement;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
let total = 0;
this.games.forEach(game => {
  total += game.prixG * 100; 
});
      const res = await fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, currency: 'usd' })

      });

      const { clientSecret } = await res.json();

      const { paymentIntent, error } = await this.stripe!.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.card!,
        },
      });

      const message = document.getElementById('payment-message');
      if (error) {
        message!.textContent = error.message || 'Payment failed';
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        this.games.forEach(game => {
  this.gameService.bought(game,this.user!.idU).subscribe();
});
this.cartService.clearCart(this.user!.idU).subscribe();
        message!.textContent = 'Payment successful!';
      }
    });
  }
}
