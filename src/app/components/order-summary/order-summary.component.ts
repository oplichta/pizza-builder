import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectOrderItems, selectOrderTotalAmount } from '../../store/order.selectors';
import { Observable } from 'rxjs';
import { Pizza } from '../../store/order.models';

@Component({
    selector: 'order-summary',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
    @Output() goToOrderForm = new EventEmitter<any>();
    pizzas$: Observable<Pizza[]>;
    totalPrice$: Observable<number>;

    constructor(private store: Store) {
        this.pizzas$ = this.store.select(selectOrderItems);
        this.totalPrice$ = this.store.select(selectOrderTotalAmount);
    }

    goToForm() {
        this.goToOrderForm.emit();
    }
}
