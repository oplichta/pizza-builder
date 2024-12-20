import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActivePizzaId, selectIngredientsOfPizza } from '../../store/order.selectors';
import { addIngredient, removeIngredient } from '../../store/order.actions';
import { Ingredient } from '../../store/ingredient.models';
import { selectAllIngredients } from '../../store/ingredient.selectors';
import { loadIngredients } from '../../store/ingredient.actions';

@Component({
    selector: 'pizza-ingredients',
    imports: [CommonModule],
    templateUrl: './pizza-ingredients.component.html',
    styleUrl: './pizza-ingredients.component.scss',
})
export class PizzaIngredientsComponent {
    ingredients: string[] = [];

    activePizzaId$: Observable<number>;
    selectedIngredients$: Observable<Ingredient[]>;
    activePizzaId = 0;
    ingredients$: Observable<Ingredient[]>;

    constructor(private store: Store) {
        this.activePizzaId$ = this.store.select(selectActivePizzaId);
        this.selectedIngredients$ = this.activePizzaId$.pipe(switchMap((pizzaId) => this.store.select(selectIngredientsOfPizza(pizzaId))));
        this.ingredients$ = this.store.select(selectAllIngredients);
        this.store.dispatch(loadIngredients());
    }

    ngOnInit() {
        this.activePizzaId$.subscribe((activePizzaId) => {
            this.activePizzaId = activePizzaId;
        });
        this.ingredients$.subscribe((ingredients) => {
            this.ingredients = ingredients.filter((i) => i.visible === true).map((x) => x.name);
        });
    }

    updateIngredient(ingredient: string) {
        this.activePizzaId$.pipe(take(1)).subscribe((activePizzaId) => {
            this.selectedIngredients$.pipe(take(1)).subscribe((ingredients) => {
                const existingIngredient = ingredients.find((x) => x.name === ingredient);
                if (existingIngredient) {
                    this.store.dispatch(removeIngredient({ pizzaId: activePizzaId, ingredientId: existingIngredient.id }));
                } else {
                    const ingredientId = ingredients.length + 1;
                    const ingredientObj = { id: ingredientId, name: ingredient, pizzaId: activePizzaId, visible: true };
                    this.store.dispatch(addIngredient({ ingredient: ingredientObj }));
                }
            });
        });
    }

    checkIngredient(ingredient: string): Observable<boolean> {
        return this.selectedIngredients$.pipe(map((ingredients) => ingredients.some((x) => x.name === ingredient)));
    }
}
