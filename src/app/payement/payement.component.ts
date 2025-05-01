import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment-service.service';
import { loadStripe } from '@stripe/stripe-js';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css'],
  imports : [NgIf]
})
export class PayementComponent implements OnInit {
  cardElement: any;
  isProcessing: boolean = false;   // Add isProcessing to manage button state
  isLoading: boolean = false;      // Manage loading state
  paymentSuccess: boolean = false;
  paymentError: string | null = null;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    // Initialize Stripe Elements
    loadStripe('pk_test_YOUR_PUBLISHABLE_KEY').then((stripe) => {
      const elements = stripe?.elements();
      if (elements) {
        this.cardElement = elements.create('card');
        this.cardElement.mount('#card-element');
      }
    });
  }

  async pay() {
    if (this.isProcessing) return;  // Prevent multiple payments at once
    this.isProcessing = true;        // Disable the button during processing
    this.paymentSuccess = false;     // Reset payment success state
    this.paymentError = null;        // Reset error message

    try {
      const stripe = await loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');
      this.isLoading = true;

      this.paymentService.createPaymentIntent(5000, 'usd').subscribe(async (res: any) => {
        const result = await stripe?.confirmCardPayment(res.clientSecret, {
          payment_method: {
            card: this.cardElement,
            billing_details: { name: 'Test User' },
          },
        });

        this.isLoading = false;

        if (result?.paymentIntent?.status === 'succeeded') {
          this.paymentSuccess = true;
          console.log('Payment succeeded!');
        } else {
          this.paymentError = 'Payment failed. Please try again.';
        }
      });
    } catch (error) {
      this.isLoading = false;
      this.paymentError = 'An error occurred during payment. Please try again.';
      console.error(error);
    } finally {
      this.isProcessing = false;  // Enable button after payment attempt
    }
  }
}
