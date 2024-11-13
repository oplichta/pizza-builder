import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Pizza, PizzaSize } from '../../store/order.models';
import { selectOrderItems } from '../../store/order.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updatePizzaSize } from '../../store/order.actions';
@Component({
  selector: 'pizza-size',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-size.component.html',
  styleUrl: './pizza-size.component.scss'
})
export class PizzaSizeComponent {
  value?: string;
  focused?: string;
  pizaSizes = PizzaSize;
  pizzas$: Observable<Pizza[]>;
  
  sizes: any[] = [
    { type: this.pizaSizes.Small, centimeters: 30 },
    { type: this.pizaSizes.Medium, centimeters: 40 },
    { type: this.pizaSizes.Large, centimeters: 50 }
  ];

  constructor(private store: Store) {
    this.pizzas$ = this.store.select(selectOrderItems);
}

  onChange(value: PizzaSize) {
    this.value = value;
    this.store.dispatch(updatePizzaSize({ size: value }));
  }

  onFocus(value: PizzaSize) {
    this.focused = value;
  }
}
