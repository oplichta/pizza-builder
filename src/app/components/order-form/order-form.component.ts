import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pizza } from '../../store/order.models';
import { selectOrderItems, selectOrderTotalAmount } from '../../store/order.selectors';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OrderSummaryComponent],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  pizzas$: Observable<Pizza[]>;
  totalAmount$: Observable<number>;
  orderForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.pizzas$ = this.store.select(selectOrderItems);
    this.totalAmount$ = this.store.select(selectOrderTotalAmount);
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  
  get formGroup(): FormGroup {
    return this.orderForm as FormGroup;
  }

  goToPayment() {
     alert('Your order is on the way! :) ');
  }

  onSubmit(event: any) {
    event.stopPropagation();
  }
}
