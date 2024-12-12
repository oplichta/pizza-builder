import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectOrderItems, selectOrderTotalAmount } from '../../store/order.selectors';
import { Observable } from 'rxjs';
import { Pizza } from '../../store/order.models';

@Component({
    selector: 'order-summary',
    imports: [CommonModule],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
    pizzas$: Observable<Pizza[]>;
    totalPrice$: Observable<number>;

    constructor(private store: Store) {
        this.pizzas$ = this.store.select(selectOrderItems);
        this.totalPrice$ = this.store.select(selectOrderTotalAmount);
    }
}
