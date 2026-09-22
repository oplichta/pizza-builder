import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActivePizzaId, selectIngredientsOfPizza } from '../../store/order.selectors';
import { addIngredient, removeIngredient } from '../../store/order.actions';
import { Ingredient } from '../../store/ingredient.models';
import { selectAllIngredients, selectIngredientsLoading } from '../../store/ingredient.selectors';
import { loadIngredients } from '../../store/ingredient.actions';
import { LoaderComponent } from '../loader/loader.component';

@Component({
    selector: 'pizza-ingredients',
    imports: [AsyncPipe, TitleCasePipe, LoaderComponent],
    templateUrl: './pizza-ingredients.component.html',
    styleUrl: './pizza-ingredients.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaIngredientsComponent {
    private store = inject(Store);

    ingredients: Signal<string[]>;

    activePizzaId$: Observable<number>;
    selectedIngredients$: Observable<Ingredient[]>;
    selectedIngredientNames$: Observable<Set<string>>;
    loading$: Observable<boolean>;

    constructor() {
        this.activePizzaId$ = this.store.select(selectActivePizzaId);
        this.selectedIngredients$ = this.activePizzaId$.pipe(switchMap((pizzaId) => this.store.select(selectIngredientsOfPizza(pizzaId))));
        this.selectedIngredientNames$ = this.selectedIngredients$.pipe(map((ingredients) => new Set(ingredients.map((i) => i.name))));
        this.ingredients = toSignal(
            this.store.select(selectAllIngredients).pipe(map((ingredients) => ingredients.filter((i) => i.visible).map((i) => i.name))),
            { initialValue: [] }
        );

        this.loading$ = this.store.select(selectIngredientsLoading);
        this.store.dispatch(loadIngredients());
    }

    updateIngredient(ingredient: string) {
        combineLatest([this.activePizzaId$, this.selectedIngredients$])
            .pipe(take(1))
            .subscribe(([activePizzaId, selectedIngredients]) => {
                const existingIngredient = selectedIngredients.find((x) => x.name === ingredient);
                if (existingIngredient) {
                    this.store.dispatch(removeIngredient({ pizzaId: activePizzaId, ingredientId: existingIngredient.id }));
                } else {
                    const ingredientId = Math.max(0, ...selectedIngredients.map((i) => i.id)) + 1;
                    const ingredientObj = { id: ingredientId, name: ingredient, pizzaId: activePizzaId, visible: true };
                    this.store.dispatch(addIngredient({ ingredient: ingredientObj }));
                }
            });
    }
}
