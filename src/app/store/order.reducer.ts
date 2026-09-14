import { Action, createReducer, on } from '@ngrx/store';
import {
    addIngredient,
    removeIngredient,
    clearOrder,
    addPizza,
    removePizza,
    updatePizzaSize,
    setActivePizza,
    checkPromoCode,
    checkPromoCodeSuccess,
    checkPromoCodeFailure,
    clearPromoCode,
} from './order.actions';
import { OrderState, Pizza, PizzaSize, PromoState } from './order.models';

export const initialPromoState: PromoState = { code: null, percent: 0, status: 'idle' };
export const initialOrderState: OrderState = {
    pizzas: [],
    activePizzaId: 0,
    promo: initialPromoState,
    totalAmount: 0,
};

const prices = {
    [PizzaSize.Small]: { base: 9.99, ingredients: 0.69 },
    [PizzaSize.Medium]: { base: 12.99, ingredients: 0.99 },
    [PizzaSize.Large]: { base: 16.99, ingredients: 1.29 },
};

const calculatePizzaPrice = (pizza: Pizza) => {
    const basePrice = prices[pizza.size]?.base || 0;
    const ingredientsPrice = pizza.selectedIngredients.length * prices[pizza.size]?.ingredients || 0;
    return basePrice + ingredientsPrice;
};

const _orderReducer = createReducer(
    initialOrderState,

    on(addPizza, (state, { pizza }) => {
        const pizzaPrice = calculatePizzaPrice(pizza);
        const updatedPizza = { ...pizza, price: pizzaPrice };
        const updatedPizzas = [...state.pizzas, updatedPizza];
        const updatedTotalAmount = state.totalAmount + pizzaPrice * pizza.quantity;
        return { ...state, pizzas: updatedPizzas, totalAmount: updatedTotalAmount };
    }),

    on(removePizza, (state, { pizzaId }) => {
        const updatedPizzas = state.pizzas.filter((pizza) => pizza.id !== pizzaId);
        const updatedTotalAmount = updatedPizzas.reduce((sum, pizza) => sum + pizza.price * pizza.quantity, 0);
        return { ...state, pizzas: updatedPizzas, totalAmount: updatedTotalAmount };
    }),

    on(addIngredient, (state, { ingredient }) => {
        const activePizzaId = state.activePizzaId;
        const updatedPizzas = state.pizzas.map((pizza) => {
            if (pizza.id === activePizzaId) {
                const updateIngredients = [...pizza.selectedIngredients, ingredient];
                const updatedPizza = { ...pizza, selectedIngredients: updateIngredients };
                const pizzaPrice = calculatePizzaPrice(updatedPizza);
                return { ...updatedPizza, price: pizzaPrice };
            }
            return pizza;
        });
        const updatedTotalAmount = updatedPizzas.reduce((sum, pizza) => sum + pizza.price * pizza.quantity, 0);
        return { ...state, pizzas: updatedPizzas, totalAmount: updatedTotalAmount };
    }),

    on(removeIngredient, (state, { pizzaId, ingredientId }) => {
        const updatedPizzas = state.pizzas.map((pizza) => {
            if (pizza.id === pizzaId) {
                const updatedItems = pizza.selectedIngredients.filter((item) => item.id !== ingredientId);
                const updatedPizza = { ...pizza, selectedIngredients: updatedItems };
                const pizzaPrice = calculatePizzaPrice(updatedPizza);
                return { ...updatedPizza, price: pizzaPrice };
            }
            return pizza;
        });
        const updatedTotalAmount = updatedPizzas.reduce((sum, pizza) => sum + pizza.price * pizza.quantity, 0);
        return { ...state, pizzas: updatedPizzas, totalAmount: updatedTotalAmount };
    }),

    on(updatePizzaSize, (state, { size }) => {
        const pizzaId = state.activePizzaId;
        const updatedPizzas = state.pizzas.map((pizza) => {
            if (pizza.id === pizzaId) {
                const updatedPizza = { ...pizza, size };
                const pizzaPrice = calculatePizzaPrice(updatedPizza);
                return { ...updatedPizza, price: pizzaPrice };
            }
            return pizza;
        });
        const updatedTotalAmount = updatedPizzas.reduce((sum, pizza) => sum + pizza.price * pizza.quantity, 0);
        return { ...state, pizzas: updatedPizzas, totalAmount: updatedTotalAmount };
    }),

    on(setActivePizza, (state, { pizzaId }) => ({ ...state, activePizzaId: pizzaId })),

    on(clearOrder, () => initialOrderState ),

    on(checkPromoCode, (state, { code }) => {
        return { ...state, promo: { code, percent: 0, status: 'checking' } };
    }),

    on(checkPromoCodeSuccess, (state, { code, percent }) => {
        return { ...state, promo: { code, percent, status: 'valid' } };
    }),

    on(checkPromoCodeFailure, (state, { code }) => {
        return { ...state, promo: { code, percent: 0, status: 'invalid' } };
    }),

    on(clearPromoCode, (state) => {
        return { ...state, promo: initialPromoState };
    })
);

export function orderReducer(state: OrderState | undefined, action: Action) {
    return _orderReducer(state, action);
}
