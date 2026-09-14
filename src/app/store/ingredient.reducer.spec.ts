import { ingredientReducer, initialState } from './ingredient.reducer';
import {
    loadIngredients,
    loadIngredientsSuccess,
    loadIngredientsFailure,
    updateIngredientSuccess,
    updateIngredientFailure,
} from './ingredient.actions';
import { Ingredient } from './ingredient.models';

describe('ingredientReducer', () => {
    const ingredient1: Ingredient = { id: 1, pizzaId: 0, name: 'cheese', visible: true };
    const ingredient2: Ingredient = { id: 2, pizzaId: 0, name: 'olive', visible: true };

    it('returns the initial state for an unknown action', () => {
        const state = ingredientReducer(undefined, { type: '@@INIT' } as any);
        expect(state).toEqual(initialState);
    });

    it('sets loading to true on loadIngredients', () => {
        const state = ingredientReducer(initialState, loadIngredients());
        expect(state.loading).toBe(true);
    });

    it('sets ingredients, clears loading and error on loadIngredientsSuccess', () => {
        const dirtyState = { ...initialState, loading: true, error: 'previous error' };
        const state = ingredientReducer(dirtyState, loadIngredientsSuccess({ ingredients: [ingredient1, ingredient2] }));
        expect(state.ingredients).toEqual([ingredient1, ingredient2]);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('sets error and clears loading on loadIngredientsFailure', () => {
        const loadingState = { ...initialState, loading: true };
        const state = ingredientReducer(loadingState, loadIngredientsFailure({ error: 'network error' }));
        expect(state.error).toBe('network error');
        expect(state.loading).toBe(false);
    });

    it('updates a single ingredient on updateIngredientSuccess', () => {
        const stateWithIngredients = { ...initialState, ingredients: [ingredient1, ingredient2] };
        const updated: Ingredient = { ...ingredient1, visible: false };
        const state = ingredientReducer(stateWithIngredients, updateIngredientSuccess({ ingredient: updated }));
        expect(state.ingredients).toEqual([updated, ingredient2]);
    });

    it('leaves other ingredients untouched on updateIngredientSuccess', () => {
        const stateWithIngredients = { ...initialState, ingredients: [ingredient1, ingredient2] };
        const updated: Ingredient = { ...ingredient1, visible: false };
        const state = ingredientReducer(stateWithIngredients, updateIngredientSuccess({ ingredient: updated }));
        expect(state.ingredients[1]).toBe(ingredient2);
    });

    it('sets error on updateIngredientFailure', () => {
        const state = ingredientReducer(initialState, updateIngredientFailure({ error: 'update failed' }));
        expect(state.error).toBe('update failed');
    });
});