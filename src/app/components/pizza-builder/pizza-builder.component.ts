import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaPreviewComponent } from '../pizza-preview/pizza-preview.component';
import { OrderSummaryComponent } from '../../order/order-summary/order-summary.component';
import { PizzaCreatorComponent } from '../pizza-creator/pizza-creator.component';

@Component({
    selector: 'app-pizza-builder',
    imports: [PizzaPreviewComponent, PizzaCreatorComponent, OrderSummaryComponent],
    templateUrl: './pizza-builder.component.html',
    styleUrl: './pizza-builder.component.scss',
})
export class PizzaBuilderComponent {
    constructor(private router: Router) {}

    goToOrder() {
        this.router.navigate(['order']);
    }

    managerLogin() {
      this.router.navigate(['manager']);
  }
}
