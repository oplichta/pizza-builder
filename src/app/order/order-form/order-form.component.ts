import { Component, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderDetails } from '../../services/order-details.service';
@Component({
    selector: 'order-form',
    imports: [ReactiveFormsModule],
    templateUrl: './order-form.component.html',
    styleUrl: './order-form.component.scss',
})
export class OrderFormComponent implements OnInit {
    orderForm!: FormGroup;
    formDataSignal = output<{ formData: OrderDetails; isValid: boolean }>();
    fields = [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Jan Kowalski' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
        { name: 'address', label: 'Address', type: 'text', placeholder: 'Street' },
        { name: 'postcode', label: 'Postcode', type: 'text', placeholder: '00-000' },
        { name: 'phone', label: 'Contact Number', type: 'text', placeholder: '+48 123 456 789' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        // Fields are seeded with sample data so the demo can be walked through without typing.
        this.orderForm = this.fb.group({
            name: ['Jan Kowalski', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            email: ['jan.kowalski@kowalski-test.pl', [Validators.required, Validators.email]],
            phone: ['+48 123 456 789', [Validators.required, Validators.pattern(/^\+\d{1,3}(\s?\d{3}){3}$/)]],
            address: ['aleja Grunwaldzka 129, Gdańsk', [Validators.required, Validators.minLength(3)]],
            postcode: ['80-244', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]],
        });
        // Listen for changes in the form and update the signal
        this.orderForm.valueChanges.subscribe(() => {
            this.formDataSignal.emit({
                formData: this.orderForm.value,
                isValid: this.orderForm.valid,
            });
        });
        // valueChanges doesn't fire for the seeded values, so emit them once up front to let the
        // parent's validity gate (the Continue button) reflect the pre-filled demo data.
        this.formDataSignal.emit({
            formData: this.orderForm.value,
            isValid: this.orderForm.valid,
        });
    }
}
