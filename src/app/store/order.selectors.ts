// order.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderState } from './order.models';

export const selectOrderState = createFeatureSelector<OrderState>('order');
export const selectOrderItems = createSelector(selectOrderState, (state: OrderState) => state.pizzas);
export const selectOrderTotalAmount = createSelector(selectOrderState, (state: OrderState) => state.totalAmount);
