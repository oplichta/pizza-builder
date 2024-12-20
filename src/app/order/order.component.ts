import { Component, computed, signal } from '@angular/core';
import { PizzaPreviewComponent } from '../components/pizza-preview/pizza-preview.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order',
    imports: [CommonModule, PizzaPreviewComponent, OrderFormComponent, OrderSummaryComponent],
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
    constructor(private router: Router) {}
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
       this.router.navigate(['delivery']);
    }
}
