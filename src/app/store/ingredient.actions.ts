import { createAction, props } from '@ngrx/store';
import { Ingredient } from './ingredient.models';

// load
export const loadIngredients = createAction('[Ingredient] Load Ingredients');
export const loadIngredientsSuccess = createAction('[Ingredient] Load Ingredients Success', props<{ ingredients: Ingredient[] }>());
export const loadIngredientsFailure = createAction('[Ingredient] Load Ingredients Failure', props<{ error: string }>());

// update
export const updateIngredient = createAction('[Ingredient] Update Ingredient', props<{ ingredient: Ingredient }>());
export const updateIngredientSuccess = createAction('[Ingredient] Update Ingredient Success', props<{ ingredient: Ingredient }>());
export const updateIngredientFailure = createAction('[Ingredient] Update Ingredient Failure', props<{ error: string }>());
