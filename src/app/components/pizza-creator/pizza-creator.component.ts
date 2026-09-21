import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { addPizza, removePizza, setActivePizza, updatePizzaSize } from '../../store/order.actions';
import { Pizza, PizzaSize } from '../../store/order.models';
import { selectActivePizzaId, selectOrderItems } from '../../store/order.selectors';
import { PizzaIngredientsComponent } from '../pizza-ingredients/pizza-ingredients.component';
import { PizzaSizeComponent } from '../pizza-size/pizza-size.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'pizza-creator',
    imports: [PizzaSizeComponent, AsyncPipe, PizzaIngredientsComponent, ReactiveFormsModule],
    templateUrl: './pizza-creator.component.html',
    styleUrl: './pizza-creator.component.scss',
})
export class PizzaCreatorComponent implements OnInit {
    private store = inject(Store);
    private fb = inject(FormBuilder);
    private router = inject(Router);

    pizzas$: Observable<Pizza[]>;
    pizzaSizes = PizzaSize;
    activePizzaId$: Observable<number>;
    form: FormGroup;

    constructor() {
        this.pizzas$ = this.store.select(selectOrderItems);
        this.activePizzaId$ = this.store.select(selectActivePizzaId);
        this.form = this.fb.group({
            pizzaSize: [PizzaSize.Small],
        });
    }

    ngOnInit() {
        this.pizzas$.pipe(take(1)).subscribe((pizzas) => {
            if (pizzas.length === 0) this.addPizza();
        });
    }

    addPizza() {
        this.pizzas$.pipe(take(1)).subscribe((pizzas) => {
            const pizzaId = Math.max(-1, ...pizzas.map((p) => p.id)) + 1;
            const pizza: Pizza = {
                id: pizzaId,
                size: this.pizzaSizes.Small,
                name: 'Pizza',
                price: 1,
                quantity: 1,
                selectedIngredients: [],
            };
            this.store.dispatch(addPizza({ pizza }));
            this.store.dispatch(setActivePizza({ pizzaId }));
        });
    }

    removePizza(index: number): void {
        this.pizzas$.pipe(take(1)).subscribe((pizzas) => {
            const pizzaId = pizzas[index].id;
            this.store.dispatch(removePizza({ pizzaId }));
            const remaining = pizzas.filter((p) => p.id !== pizzaId);
            this.store.dispatch(setActivePizza({ pizzaId: remaining.at(-1)?.id ?? 0 }));
        });
    }

    togglePizza(index: number): void {
        this.pizzas$.pipe(take(1)).subscribe((pizzas) => {
            const pizzaId = pizzas[index].id;
            this.store.dispatch(setActivePizza({ pizzaId }));
        });
    }

    updatePizzaSize(event: Event) {
        const size = (event.target as HTMLInputElement).value as PizzaSize;
        this.store.dispatch(updatePizzaSize({ size }));
    }
}
