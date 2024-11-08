import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'order-summary',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
    @Input() parent?: FormGroup;
    @Input() totalPrice?: string;
    @Input() prices: any;
}
