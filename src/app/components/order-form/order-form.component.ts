import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { PizzaCreatorComponent } from '../pizza-creator/pizza-creator.component';
import { Ingredients, Pizza } from '../../store/order.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectOrderItems, selectOrderTotalAmount } from '../../store/order.selectors';
import { addItem, removeItem, updateItemQuantity, clearOrder, addPizza } from '../../store/order.actions';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OrderSummaryComponent, PizzaCreatorComponent],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  @Input() parent?: FormGroup;
  @Input() totalPrice?: string;
  @Input() prices: any;

  @Output() add = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<number>();
  @Output() submit = new EventEmitter<any>();

  get pizzas(): FormArray {
    return this.parent?.get('pizzas') as FormArray || new FormArray([]);
  }

  pizzas$: Observable<Pizza[]>;
  totalAmount$: Observable<number>;

  constructor(private store: Store) {
    this.pizzas$ = this.store.select(selectOrderItems);
    this.totalAmount$ = this.store.select(selectOrderTotalAmount);
  }

  onAddPizza(event: any) {
    this.add.emit(event);
  }

  onRemovePizza(event: any) {
    this.remove.emit(event);
  }

  onToggle(event: any) {
    this.toggle.emit(event);
  }

  onSubmit(event: any) {
    event.stopPropagation();
    this.submit.emit(this.parent);
  }

  // addPizzaToOrder(pizza: PizzaItem) {
  addPizzaToOrder() {
    const pizza: Pizza = { id: 1, name: 'Pizza', price: 10, quantity: 1, items: [] };
    this.store.dispatch(addPizza({ pizza }));
    console.log('Added to order:', pizza, this.store);
  }

  addToOrder(item: Ingredients) {
    this.store.dispatch(addItem({ item }));
  }

  removeFromOrder(itemId: number) {
    this.store.dispatch(removeItem({ itemId }));
  }

  updateQuantity(itemId: number, quantity: number) {
    this.store.dispatch(updateItemQuantity({ itemId, quantity }));
  }

  clearOrder() {
    this.store.dispatch(clearOrder());
  }

}
