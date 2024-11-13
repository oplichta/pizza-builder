import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { Ingredient, Pizza } from '../../store/order.models';
import { Store } from '@ngrx/store';
import { selectActivePizzaId, selectIngredientsOfPizza } from '../../store/order.selectors';
import { addIngredient, removeIngredient } from '../../store/order.actions';

@Component({
    selector: 'pizza-ingredients',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pizza-ingredients.component.html',
    styleUrl: './pizza-ingredients.component.scss',
})
export class PizzaIngredientsComponent {
    ingredients = [
        'anchovy',
        'bacon',
        'basil',
        'chili',
        'mozzarella',
        'mushroom',
        'olive',
        'onion',
        'pepper',
        'pepperoni',
        'sweetcorn',
        'tomato',
    ];

    activePizzaId$: Observable<number>;
    ingredients$: Observable<Ingredient[]>;
    activePizzaId = 0;

    constructor(private store: Store) {
        this.activePizzaId$ = this.store.select(selectActivePizzaId);
        this.ingredients$ = this.activePizzaId$.pipe(switchMap((pizzaId) => this.store.select(selectIngredientsOfPizza(pizzaId))));
    }

    ngOnInit() {
        this.activePizzaId$.subscribe((activePizzaId) => {
            this.activePizzaId = activePizzaId;
        });
    }
    
    updateIngredient(ingredient: string) {
        this.activePizzaId$.pipe(take(1)).subscribe((activePizzaId) => {
            this.ingredients$.pipe(take(1)).subscribe((ingredients) => {
                const existingIngredient = ingredients.find((x) => x.name === ingredient);
                if (existingIngredient) {
                    this.store.dispatch(removeIngredient({ pizzaId: activePizzaId, ingredientId: existingIngredient.id }));
                } else {
                    const ingredientId = ingredients.length + 1;
                    const ingredientObj = { id: ingredientId, name: ingredient, quantity: 1, pizzaId: activePizzaId };
                    this.store.dispatch(addIngredient({ ingredient: ingredientObj }));
                }
            });
        });
    }

    checkIngredient(ingredient: string): Observable<boolean> {
        return this.ingredients$.pipe(map((ingredients) => ingredients.some((x) => x.name === ingredient)));
    }
}
