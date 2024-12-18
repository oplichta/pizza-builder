import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  processPayment() {
    return of('success').pipe(delay(2000));
  }
}
