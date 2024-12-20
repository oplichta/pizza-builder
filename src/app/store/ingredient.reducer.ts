import { createFeature, createReducer, on } from '@ngrx/store';
import * as IngredientActions from './ingredient.actions';
import { Ingredient } from './ingredient.models';

export interface IngredientState {
    ingredients: Ingredient[];
    loading: boolean;
    error: string | null;
}

export const initialState: IngredientState = {
    ingredients: [],
    loading: false,
    error: null,
};

export const _ingredientReducer = createReducer(
        initialState,
        on(IngredientActions.loadIngredients, (state) => ({
            ...state,
            loading: true,
        })),
        on(IngredientActions.loadIngredientsSuccess, (state, { ingredients }) => ({
            ...state,
            ingredients,
            loading: false,
        })),
        on(IngredientActions.loadIngredientsFailure, (state, { error }) => ({
            ...state,
            error,
            loading: false,
        })), 
        on(IngredientActions.loadIngredientsSuccess, (state, { ingredients }) => ({
            ...state,
            ingredients,
            loading: false,
            error: null,
          })),
          on(IngredientActions.updateIngredientSuccess, (state, { ingredient }) => ({
            ...state,
            ingredients: state.ingredients.map((i) =>
              i.id === ingredient.id ? ingredient : i
            ),
          })),
          on(IngredientActions.updateIngredientFailure, (state, { error }) => ({
            ...state,
            error,
          }))
    );

export function ingredientReducer(state: any, action: any) {
    return _ingredientReducer(state, action);
}
