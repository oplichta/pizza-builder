import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Pizza } from '../../store/order.models';
import { Store } from '@ngrx/store';
import { selectActivePizzaId, selectIngredientsOfPizza, selectOrderItems } from '../../store/order.selectors';
import { Ingredient } from '../../store/ingredient.models';

@Component({
    selector: 'pizza-preview',
    imports: [AsyncPipe],
    templateUrl: './pizza-preview.component.html',
    styleUrl: './pizza-preview.component.scss',
})
export class PizzaPreviewComponent {
    private store = inject(Store);

    ingredients$: Observable<Ingredient[]>;
    pizzas$: Observable<Pizza[]>;
    activePizzaId$: Observable<number>;

    constructor() {
        this.pizzas$ = this.store.select(selectOrderItems);
        this.activePizzaId$ = this.store.select(selectActivePizzaId);
        this.ingredients$ = this.activePizzaId$.pipe(switchMap((pizzaId) => this.store.select(selectIngredientsOfPizza(pizzaId))));
    }
}
