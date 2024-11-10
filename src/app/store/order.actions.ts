import { createAction, props } from '@ngrx/store';
import { Ingredient, Pizza, PizzaSize} from './order.models';

export const addPizza = createAction('[Order] Add Pizza', props<{ pizza: Pizza }>());
export const removePizza = createAction('[Order] Remove Pizza', props<{ pizzaId: number }>());
export const addIngredient = createAction('[Order] Add Ingredient', props<{ ingredient: Ingredient }>());
export const removeIngredient = createAction('[Order] Remove Ingredient', props<{ pizzaId: number, ingredientId: number }>());
export const updateItemQuantity = createAction('[Order] Update Item Quantity', props<{ itemId: number; quantity: number }>());
export const clearOrder = createAction('[Order] Clear Order');
export const setActivePizza = createAction('[Order] Set Active Pizza', props<{ pizzaId: number }>());
export const updatePizzaSize = createAction('[Order] Update Pizza Size', props<{ size: PizzaSize }>());
