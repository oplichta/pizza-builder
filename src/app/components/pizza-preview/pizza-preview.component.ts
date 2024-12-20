import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { Pizza } from '../../store/order.models';
import { Store } from '@ngrx/store';
import { selectActivePizzaId, selectIngredientsOfPizza, selectOrderItems } from '../../store/order.selectors';
import { Ingredient } from '../../store/ingredient.models';

export const DROP_ANIMATION = trigger('drop', [
    transition(':enter', [
        style({ transform: 'translateY(-200px)', opacity: 0 }),
        animate('300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({ transform: 'translateY(0)', opacity: 1 })),
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({ transform: 'translateY(-200px)', opacity: 0 })),
    ]),
]);

@Component({
    selector: 'pizza-preview',
    imports: [CommonModule],
    templateUrl: './pizza-preview.component.html',
    styleUrl: './pizza-preview.component.scss',
    animations: [DROP_ANIMATION]
})
export class PizzaPreviewComponent {
    ingredients$: Observable<Ingredient[]>;
    pizzas$: Observable<Pizza[]>;
    activePizzaId$: Observable<number>;
    activePizzaId = 0;

    constructor(private store: Store) {
        this.pizzas$ = this.store.select(selectOrderItems);
        this.activePizzaId$ = this.store.select(selectActivePizzaId);
        this.ingredients$ = this.activePizzaId$.pipe(switchMap((pizzaId) => this.store.select(selectIngredientsOfPizza(pizzaId))));
    }

    ngOnInit() {
      this.activePizzaId$.subscribe((activePizzaId) => {
        this.activePizzaId = activePizzaId;
      });
    }

}
