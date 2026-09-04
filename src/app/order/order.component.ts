import { Component, computed, signal } from '@angular/core';
import { PizzaPreviewComponent } from '../components/pizza-preview/pizza-preview.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderDetailsService } from '../services/order-details.service';

import { Router } from '@angular/router';
import { PromoCodeComponent } from '../components/promo-code/promo-code.component';

@Component({
    selector: 'app-order',
    imports: [PizzaPreviewComponent, OrderFormComponent, OrderSummaryComponent, PromoCodeComponent],
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
    constructor(private router: Router, private orderDetailsService: OrderDetailsService) {}
    orderFormDataSignal = signal<{ formData: any; isValid: boolean }>({ formData: {}, isValid: false });

    orderDetails = computed(() => this.orderFormDataSignal().formData);
    isFormValid = computed(() => this.orderFormDataSignal().isValid);

    updateOrderDetails(newData: { formData: any; isValid: boolean }) {
        this.orderFormDataSignal.set(newData);
    }

    formDataSignalHandler(newData: { formData: any; isValid: boolean }) {
        this.orderFormDataSignal.set(newData);
    }

    goToPizza() {
        this.router.navigate(['/']);
    }

    goToPayment() {
        this.orderDetailsService.setOrderDetails(this.orderDetails());
        this.router.navigate(['delivery']);
    }
}
