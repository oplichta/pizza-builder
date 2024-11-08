import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { PizzaSizeComponent } from '../pizza-size/pizza-size.component';
import { CommonModule } from '@angular/common';
import { PizzaIngredientsComponent } from '../pizza-ingredients/pizza-ingredients.component';
import { Pizza } from '../../store/order.models';
import { Observable } from 'rxjs';
import { selectOrderItems } from '../../store/order.selectors';
import { Store } from '@ngrx/store';

@Component({
    selector: 'pizza-creator',
    standalone: true,
    imports: [PizzaSizeComponent, CommonModule, PizzaIngredientsComponent],
    templateUrl: './pizza-creator.component.html',
    styleUrl: './pizza-creator.component.scss',
})
export class PizzaCreatorComponent {
    @Input() pizzas?: FormArray;

    @Output() add = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();
    @Output() toggle = new EventEmitter<number>();

    pizzas$: Observable<Pizza[]>;
  
    constructor(private store: Store) {
      this.pizzas$ = this.store.select(selectOrderItems);
    }

    get openPizza() {
        return this.visiblePizza;
    }

    set openPizza(index: number) {
        this.visiblePizza = index;
        if (~index) {
            this.toggle.emit(index);
        }
    }

    private visiblePizza: number = 0;

    addPizza() {
        if (!this.pizzas) {
            return;
        }
        this.add.emit();
        this.openPizza = this.pizzas?.length - 1;
    }

    removePizza(index: number) {
        if (!this.pizzas) {
            return;
        }
        this.remove.emit(index);
        this.openPizza = this.pizzas.length - 1;
    }

    togglePizza(index: number) {
        if (this.openPizza === index) {
            this.openPizza = -1;
            return;
        }
        this.openPizza = index;
    }
}
