import { createSelector } from '@ngrx/store';

export const selectIngredientFeature = (state: any) => state.ingredient;
export const selectAllIngredients = createSelector(selectIngredientFeature, (ingredientState) => ingredientState.ingredients);
