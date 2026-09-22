import { Component, computed, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { PizzaPreviewComponent } from '../components/pizza-preview/pizza-preview.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderDetailsService, OrderDetails } from '../services/order-details.service';

import { Router } from '@angular/router';
import { PromoCodeComponent } from '../components/promo-code/promo-code.component';

@Component({
    selector: 'app-order',
    imports: [PizzaPreviewComponent, OrderFormComponent, OrderSummaryComponent, PromoCodeComponent],
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
    private router = inject(Router);
    private orderDetailsService = inject(OrderDetailsService);

    orderFormDataSignal = signal<{ formData: Partial<OrderDetails>; isValid: boolean }>({ formData: {}, isValid: false });

    orderDetails = computed(() => this.orderFormDataSignal().formData);
    isFormValid = computed(() => this.orderFormDataSignal().isValid);

    formDataSignalHandler(newData: { formData: OrderDetails; isValid: boolean }) {
        this.orderFormDataSignal.set(newData);
    }

    goToPizza() {
        this.router.navigate(['/']);
    }

    goToPayment() {
        // Safe to assert as complete: the Continue button (bound to isFormValid()) is disabled
        // until the reactive form reports valid, so every OrderDetails field is guaranteed present here.
        this.orderDetailsService.setOrderDetails(this.orderDetails() as OrderDetails);
        this.router.navigate(['delivery']);
    }
}
