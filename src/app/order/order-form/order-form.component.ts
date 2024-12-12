import { CommonModule } from '@angular/common';
import { Component, EventEmitter, output, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'order-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './order-form.component.html',
    styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
    orderForm!: FormGroup;
    formDataSignal = output<{ formData: any; isValid: boolean }>();
    fields = [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Jan Kowalski' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
        { name: 'address', label: 'Address', type: 'text', placeholder: 'Street' },
        { name: 'postcode', label: 'Postcode', type: 'text', placeholder: '00-000' },
        { name: 'phone', label: 'Contact Number', type: 'text', placeholder: '+48 123 456 789' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.orderForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\+\d{1,3}(\s?\d{3}){3}$/)]],
            address: ['', [Validators.required, Validators.minLength(3)]],
            postcode: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]],
        });
        // Listen for changes in the form and update the signal
        this.orderForm.valueChanges.subscribe(() => {
            this.formDataSignal.emit({
                formData: this.orderForm.value,
                isValid: this.orderForm.valid,
            });
        });
    }
}
