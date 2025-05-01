// payment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number, currency: string) {
    return this.http.post('/api/create-payment-intent', { amount, currency });
  }
}
