import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { LoaderComponent } from '../components/loader/loader.component';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  paymentCompleted = false;
  loading = false;
  delivered = false;
  timerMinutes = 1;
  timerSeconds = 0;
  private interval: any;

  constructor(private router: Router, private paymentService: PaymentService) {}

  ngOnInit(): void {}

  makePayment() {
    this.loading = true;
    this.paymentService.processPayment().subscribe(() => {
      this.paymentCompleted = true;
      this.loading = false;
      this.startCountdown();
    });
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.timerSeconds === 0) {
        if (this.timerMinutes === 0) {
          clearInterval(this.interval);
          this.delivered = true;
        } else {
          this.timerMinutes--;
          this.timerSeconds = 59;
        }
      } else {
        this.timerSeconds--;
      }
    }, 1000);
  }
}
