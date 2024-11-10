import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ingredient, Pizza } from '../../store/order.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectOrderItems, selectOrderTotalAmount } from '../../store/order.selectors';
import { addIngredient, removeIngredient, updateItemQuantity, clearOrder, addPizza } from '../../store/order.actions';

@Component({
  selector: 'order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  pizzas$: Observable<Pizza[]>;
  totalAmount$: Observable<number>;
  orderForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.pizzas$ = this.store.select(selectOrderItems);
    this.totalAmount$ = this.store.select(selectOrderTotalAmount);
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        confirm: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(3)]],
      })
    });
  }
  
  get detailsFormGroup(): FormGroup {
    return this.orderForm.get('details') as FormGroup;
  }



  onSubmit(event: any) {
    event.stopPropagation();
  }
}
