import { Component, OnInit } from '@angular/core';
import { PizzaPreviewComponent } from '../pizza-preview/pizza-preview.component';
import { OrderFormComponent } from '../order-form/order-form.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { PizzaCreatorComponent } from '../pizza-creator/pizza-creator.component';

@Component({
  selector: 'app-pizza-builder',
  standalone: true,
  imports: [PizzaPreviewComponent, OrderFormComponent, PizzaCreatorComponent, OrderSummaryComponent],
  templateUrl: './pizza-builder.component.html',
  styleUrl: './pizza-builder.component.scss',
})
export class PizzaBuilderComponent {
  activePizza = 0;
  showForm = false;

  goToOrderFormHandler() {
    // this.showForm = true;
  }

  createOrder() {
  }

}
