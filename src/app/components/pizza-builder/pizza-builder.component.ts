import { Component, OnInit } from '@angular/core';
import { PizzaPreviewComponent } from '../pizza-preview/pizza-preview.component';
import { OrderFormComponent } from '../order-form/order-form.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pizza-builder',
  standalone: true,
  imports: [PizzaPreviewComponent, OrderFormComponent],
  templateUrl: './pizza-builder.component.html',
  styleUrl: './pizza-builder.component.scss',
})
export class PizzaBuilderComponent implements OnInit {
  activePizza = 0;
  totalPrice = '0';
  orderForm!: FormGroup;

  prices = {
    small: { base: 9.99, ingredients: 0.69 },
    medium: { base: 12.99, ingredients: 0.99 },
    large: { base: 16.99, ingredients: 1.29 },
  };

  get pizzas(): FormArray {
    return this.orderForm.get('pizzas') as FormArray || new FormArray([]);
  }


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        confirm: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(3)]],
      }),
      pizzas: this.fb.array([this.createPizza()]),
    });

    this.calculateTotal(this.orderForm.get('pizzas')?.value);
    this.orderForm.get('pizzas')?.valueChanges
      .subscribe(value => this.calculateTotal(value));

  }

  createPizza() {
    return this.fb.group({
      size: ['small', Validators.required],
      ingredients: [[]],
    });
  }

  addPizza() {
    const control = this.orderForm.get('pizzas') as FormArray;
    control.push(this.createPizza());
  }

  removePizza(index: number) {
    const control = this.orderForm.get('pizzas') as FormArray;
    control.removeAt(index);
  }

  togglePizza(index: number) {
    this.activePizza = index;
  }

  calculateTotal(value: any) {
    const price = value.reduce((prev: number, next: { size: 'small' | 'medium' | 'large', ingredients: any[] }) => {
      const price = this.prices[next.size];
      return prev + price.base + (price.ingredients * next.ingredients.length);
    }, 0);
    this.totalPrice = price.toFixed(2);
  }

  createOrder(order: FormGroup) {
    console.log(order.value);
  }

}
