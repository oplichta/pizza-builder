import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Firestore, collection, collectionData, CollectionReference } from '@angular/fire/firestore';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as IngredientActions from './ingredient.actions';
import { doc, updateDoc } from 'firebase/firestore';
import { Ingredient } from './ingredient.models';

@Injectable()
export class IngredientEffects {
    actions$ = inject(Actions);
    firestore = inject(Firestore);

    loadIngredients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IngredientActions.loadIngredients),
            // switchMap, not mergeMap: collectionData() is a long-lived stream, and loadIngredients
            // is dispatched from two components. mergeMap would stack overlapping Firestore
            // listeners that never complete; switchMap drops the previous one on every new action.
            switchMap(() =>
                collectionData(collection(this.firestore, 'ingredients') as CollectionReference<Ingredient>, { idField: 'id' }).pipe(
                    map((ingredients) => IngredientActions.loadIngredientsSuccess({ ingredients })),
                    catchError((error) => of(IngredientActions.loadIngredientsFailure({ error: error.message })))
                )
            )
        )
    );

    updateIngredient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IngredientActions.updateIngredient),
            mergeMap(({ ingredient }) =>
                updateDoc(doc(this.firestore, `ingredients/${ingredient.id}`), {
                    visible: ingredient.visible,
                })
                    .then(() => IngredientActions.updateIngredientSuccess({ ingredient }))
                    .catch((error) => IngredientActions.updateIngredientFailure({ error: error.message }))
            )
        )
    );
}
