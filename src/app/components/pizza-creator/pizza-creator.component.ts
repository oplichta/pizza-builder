import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { addPizza, removePizza, setActivePizza } from '../../store/order.actions';
import { Pizza, PizzaSize } from '../../store/order.models';
import { selectActivePizzaId, selectOrderItems } from '../../store/order.selectors';
import { PizzaIngredientsComponent } from '../pizza-ingredients/pizza-ingredients.component';
import { PizzaSizeComponent } from '../pizza-size/pizza-size.component';

@Component({
    selector: 'pizza-creator',
    standalone: true,
    imports: [PizzaSizeComponent, CommonModule, PizzaIngredientsComponent],
    templateUrl: './pizza-creator.component.html',
    styleUrl: './pizza-creator.component.scss',
})
export class PizzaCreatorComponent implements OnInit {
    @Output() add = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();
    @Output() toggle = new EventEmitter<number>();

    pizzas$: Observable<Pizza[]>;
    pizzaSizes = PizzaSize;
    activePizzaId$: Observable<number>;

    constructor(private store: Store) {
        this.pizzas$ = this.store.select(selectOrderItems);
        this.activePizzaId$ = this.store.select(selectActivePizzaId);
    }

    ngOnInit() {
        this.addPizza();
    }

    addPizza() {
        this.pizzas$.pipe(take(1)).subscribe((pizzas) => {
            const pizzaId = pizzas.length;
            const pizza: Pizza = { id: pizzaId, size: this.pizzaSizes.Small, name: 'Pizza', price: 1, quantity: 1, ingredients: [] };
            this.store.dispatch(addPizza({ pizza }));
            this.store.dispatch(setActivePizza({ pizzaId }));
        });
    }

    removePizza(index: number): void {
        this.pizzas$.pipe(take(1)).subscribe((pizzas) => {
            const pizzaId = pizzas[index].id;
            this.store.dispatch(removePizza({ pizzaId }));
            const newActivePizzaId = pizzas.length > 1 ? pizzas[pizzas.length - 2].id : 0;
            this.store.dispatch(setActivePizza({ pizzaId: newActivePizzaId }));
        });
    }

    togglePizza(index: number): void {
        this.pizzas$.pipe(take(1)).subscribe((pizzas) => {
            const pizzaId = pizzas[index].id;
            this.store.dispatch(setActivePizza({ pizzaId }));
            this.toggle.emit(index);
        });
    }
}
