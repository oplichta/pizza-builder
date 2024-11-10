// order.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderState, Pizza } from './order.models';

export const selectOrderState = createFeatureSelector<OrderState>('order');
export const selectOrderItems = createSelector(selectOrderState, (state: OrderState) => state.pizzas);
export const selectPizzaById = (pizzaId: number) =>
    createSelector(selectOrderState, (state: OrderState) => state.pizzas.find((pizza) => pizza.id === pizzaId));
export const selectIngredientsOfPizza = (pizzaId: number) =>
    createSelector(selectPizzaById(pizzaId), (pizza: Pizza | undefined) => (pizza ? pizza.ingredients : []));
export const selectOrderTotalAmount = createSelector(selectOrderState, (state: OrderState) => state.totalAmount);
export const selectActivePizzaId = createSelector(selectOrderState, (state: OrderState) => state.activePizzaId);
