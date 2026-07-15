import { Injectable, signal } from '@angular/core';

export interface OrderDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  orderDetails = signal<OrderDetails | null>(null);

  setOrderDetails(details: OrderDetails) {
    this.orderDetails.set(details);
  }
}
