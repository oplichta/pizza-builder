import { AsyncPipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDiscountAmount, selectFinalTotal, selectOrderItems, selectOrderTotalAmount } from '../../store/order.selectors';
import { Observable } from 'rxjs';
import { Pizza } from '../../store/order.models';

@Component({
    selector: 'order-summary',
    imports: [AsyncPipe, CurrencyPipe, TitleCasePipe],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent {
    private store = inject(Store);

    pizzas$: Observable<Pizza[]>;
    totalPrice$: Observable<number>;
    discount$: Observable<number>;
    finalTotal$: Observable<number>;

    constructor() {
        this.pizzas$ = this.store.select(selectOrderItems);
        this.totalPrice$ = this.store.select(selectOrderTotalAmount);
        this.discount$ = this.store.select(selectDiscountAmount);
        this.finalTotal$ = this.store.select(selectFinalTotal);
    }
}
