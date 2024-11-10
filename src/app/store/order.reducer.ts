import { createReducer, on } from '@ngrx/store';
import { addIngredient, removeIngredient, updateItemQuantity, clearOrder, addPizza, removePizza, updatePizzaSize, setActivePizza } from './order.actions';
import { OrderState, Pizza, PizzaSize } from './order.models';

export const initialOrderState: OrderState = {
    pizzas: [],
    activePizzaId: 0,
    totalAmount: 0,
};

const prices = {
    [PizzaSize.Small]: { base: 9.99, ingredients: 0.69 },
    [PizzaSize.Medium]: { base: 12.99, ingredients: 0.99 },
    [PizzaSize.Large]: { base: 16.99, ingredients: 1.29 },
};

const calculatePizzaPrice = (pizza: Pizza) => {
    const basePrice = prices[pizza.size]?.base || 0;
    const ingredientsPrice = pizza.ingredients.reduce((sum, item) => sum + (prices[pizza.size]?.ingredients || 0) * item.quantity, 0);
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
                const updateIngredients = [...pizza.ingredients, ingredient];
                const updatedPizza = { ...pizza, ingredients: updateIngredients };
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
                const updatedItems = pizza.ingredients.filter((item) => item.id !== ingredientId);
                const updatedPizza = { ...pizza, ingredients: updatedItems };
                const pizzaPrice = calculatePizzaPrice(updatedPizza);
                return { ...updatedPizza, price: pizzaPrice };
            }
            return pizza;
        });
        const updatedTotalAmount = updatedPizzas.reduce((sum, pizza) => sum + pizza.price * pizza.quantity, 0);
        return { ...state, pizzas: updatedPizzas, totalAmount: updatedTotalAmount };
    }),

    on(updateItemQuantity, (state, { itemId, quantity }) => {
        const updatedPizzas = state.pizzas.map((pizza) => {
            const updatedItems = pizza.ingredients.map((item) => (item.id === itemId ? { ...item, quantity } : item));
            const updatedPizza = { ...pizza, items: updatedItems };
            const pizzaPrice = calculatePizzaPrice(updatedPizza);
            return { ...updatedPizza, price: pizzaPrice };
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

    on(clearOrder, (state) => ({ ...state, pizzaItems: [], totalAmount: 0 }))
);

export function orderReducer(state: any, action: any) {
    return _orderReducer(state, action);
}
