import { orderReducer, initialOrderState } from './order.reducer';
import { addPizza, removePizza, addIngredient, removeIngredient, updatePizzaSize, setActivePizza, clearOrder } from './order.actions';
import { Pizza, PizzaSize } from './order.models';
import { Ingredient } from './ingredient.models';

describe('orderReducer', () => {
    const mockPizza: Pizza = {
        id: 1,
        name: 'Margherita',
        price: 0,
        size: PizzaSize.Small,
        quantity: 1,
        selectedIngredients: [],
    };

    it('returns the initial state for an unknown action', () => {
        const state = orderReducer(undefined, { type: '@@INIT' } as any);
        expect(state).toEqual(initialOrderState);
    });

    it('adds a pizza and updates totalAmount', () => {
        const state = orderReducer(initialOrderState, addPizza({ pizza: mockPizza }));
        expect(state.pizzas.length).toBe(1);
        expect(state.pizzas[0].price).toBeCloseTo(9.99);
        expect(state.totalAmount).toBeCloseTo(9.99);
    });

    it('removes a pizza and recomputes totalAmount', () => {
        const withPizza = orderReducer(initialOrderState, addPizza({ pizza: mockPizza }));
        const state = orderReducer(withPizza, removePizza({ pizzaId: 1 }));
        expect(state.pizzas.length).toBe(0);
        expect(state.totalAmount).toBe(0);
    });

    it('adds an ingredient to the active pizza and recalculates its price', () => {
        const withPizza = orderReducer(initialOrderState, addPizza({ pizza: mockPizza }));
        const withActive = orderReducer(withPizza, setActivePizza({ pizzaId: 1 }));
        const ingredient: Ingredient = { id: 1, pizzaId: 1, name: 'cheese', visible: true };
        const state = orderReducer(withActive, addIngredient({ ingredient }));
        expect(state.pizzas[0].selectedIngredients.length).toBe(1);
        expect(state.pizzas[0].price).toBeCloseTo(9.99 + 0.69);
        expect(state.totalAmount).toBeCloseTo(9.99 + 0.69);
    });

    it('removes an ingredient from the given pizza', () => {
        const ingredient: Ingredient = { id: 1, pizzaId: 1, name: 'cheese', visible: true };
        const pizzaWithIngredient: Pizza = { ...mockPizza, selectedIngredients: [ingredient] };
        const withPizza = orderReducer(initialOrderState, addPizza({ pizza: pizzaWithIngredient }));
        const state = orderReducer(withPizza, removeIngredient({ pizzaId: 1, ingredientId: 1 }));
        expect(state.pizzas[0].selectedIngredients.length).toBe(0);
    });

    it('updates the active pizza size and recalculates its price', () => {
        const withPizza = orderReducer(initialOrderState, addPizza({ pizza: mockPizza }));
        const withActive = orderReducer(withPizza, setActivePizza({ pizzaId: 1 }));
        const state = orderReducer(withActive, updatePizzaSize({ size: PizzaSize.Large }));
        expect(state.pizzas[0].size).toBe(PizzaSize.Large);
        expect(state.pizzas[0].price).toBeCloseTo(16.99);
    });

    it('resets the whole state on clearOrder', () => {
        const withPizza = orderReducer(initialOrderState, addPizza({ pizza: mockPizza }));
        const state = orderReducer(withPizza, clearOrder());
        expect(state).toEqual(initialOrderState);
    });
});
