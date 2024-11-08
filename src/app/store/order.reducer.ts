import { createReducer, on } from '@ngrx/store';
import { addItem, removeItem, updateItemQuantity, clearOrder, addPizza } from './order.actions';
import { OrderState } from './order.models';

export const initialOrderState: OrderState = {
    pizzas: [],
    totalAmount: 0,
};

const _orderReducer = createReducer(
    initialOrderState,

    on(addPizza, (state, { pizza }) => {
        const updatedPizzaItems = [...state.pizzas, pizza];
        const updatedTotalAmount = state.totalAmount + pizza.price * pizza.quantity;
        return { ...state, pizzaItems: updatedPizzaItems, totalAmount: updatedTotalAmount };
    }),

    on(addItem, (state, { item }) => {
        const updatedPizzaItems = state.pizzas.map(pizza => {
            if (pizza.id === item.pizzaId) {
                const updatedItems = [...pizza.items, item];
                return { ...pizza, items: updatedItems };
            }
            return pizza;
        });
        const updatedTotalAmount = state.totalAmount + item.price * item.quantity;
        return { ...state, pizzaItems: updatedPizzaItems, totalAmount: updatedTotalAmount };
    }),

    on(removeItem, (state, { itemId }) => {
        const updatedPizzaItems = state.pizzas.map(pizza => {
            const updatedItems = pizza.items.filter(item => item.id !== itemId);
            return { ...pizza, items: updatedItems };
        });
        const updatedTotalAmount = updatedPizzaItems.reduce((sum, pizza) => 
            sum + pizza.price * pizza.quantity + pizza.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0);
        return { ...state, pizzaItems: updatedPizzaItems, totalAmount: updatedTotalAmount };
    }),

    on(updateItemQuantity, (state, { itemId, quantity }) => {
        const updatedPizzaItems = state.pizzas.map(pizza => {
            const updatedItems = pizza.items.map(item => 
                item.id === itemId ? { ...item, quantity } : item);
            return { ...pizza, items: updatedItems };
        });
        const updatedTotalAmount = updatedPizzaItems.reduce((sum, pizza) => 
            sum + pizza.price * pizza.quantity + pizza.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0);
        return { ...state, pizzaItems: updatedPizzaItems, totalAmount: updatedTotalAmount };
    }),

    on(clearOrder, (state) => ({ ...state, pizzaItems: [], totalAmount: 0 }))
);

export function orderReducer(state: any, action: any) {
    return _orderReducer(state, action);
}