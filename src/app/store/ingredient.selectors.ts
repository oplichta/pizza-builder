import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientState } from './ingredient.reducer';

export const selectIngredientFeature = createFeatureSelector<IngredientState>('ingredient');
export const selectAllIngredients = createSelector(selectIngredientFeature, (state) => state.ingredients);
export const selectIngredientsLoading = createSelector(selectIngredientFeature, (state) => state.loading);
