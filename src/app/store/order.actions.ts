import { createAction, props } from '@ngrx/store';
import { Ingredients, Pizza} from './order.models';

export const addPizza = createAction('[Order] Add Pizza', props<{ pizza: Pizza }>());
export const addItem = createAction('[Order] Add Item', props<{ item: Ingredients }>());
export const removeItem = createAction('[Order] Remove Item', props<{ itemId: number }>());
export const updateItemQuantity = createAction('[Order] Update Item Quantity', props<{ itemId: number; quantity: number }>());
export const clearOrder = createAction('[Order] Clear Order');
