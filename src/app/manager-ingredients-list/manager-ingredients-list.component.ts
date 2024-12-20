import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as IngredientActions from '../store/ingredient.actions';
import { Ingredient } from '../store/ingredient.models';
import { selectAllIngredients } from '../store/ingredient.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
    selector: 'app-manager-ingredients-list',
    imports: [CommonModule, AsyncPipe],
    templateUrl: './manager-ingredients-list.component.html',
    styleUrl: './manager-ingredients-list.component.scss',
})
export class ManagerIngredientsListComponent {
    ingredients$: Observable<Ingredient[]>;
    constructor(private store: Store) {
        this.ingredients$ = this.store.select(selectAllIngredients);
        this.store.dispatch(IngredientActions.loadIngredients());
    }

    onVisibilityChange(ingredient: Ingredient, event: Event) {
        const visible = (event.target as HTMLInputElement).checked;
        this.store.dispatch(IngredientActions.updateIngredient({ ingredient: { ...ingredient, visible } }));
    }
}
