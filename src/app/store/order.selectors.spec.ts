import {
    selectOrderItems,
    selectPizzaById,
    selectIngredientsOfPizza,
    selectOrderTotalAmount,
    selectActivePizzaId,
    selectPromo,
    selectDiscountAmount,
    selectFinalTotal,
} from './order.selectors';
import { OrderState, Pizza, PizzaSize } from './order.models';
import { Ingredient } from './ingredient.models';

describe('order.selectors', () => {
    const ingredient: Ingredient = { id: 1, pizzaId: 1, name: 'cheese', visible: true };

    const pizza1: Pizza = {
        id: 1,
        name: 'Margherita',
        price: 10.68,
        size: PizzaSize.Small,
        quantity: 1,
        selectedIngredients: [ingredient],
    };

    const pizza2: Pizza = {
        id: 2,
        name: 'Capricciosa',
        price: 12.99,
        size: PizzaSize.Medium,
        quantity: 1,
        selectedIngredients: [],
    };

    const mockOrderState: OrderState = {
        pizzas: [pizza1, pizza2],
        activePizzaId: 1,
        promo: { code: 'PIZZA20', percent: 20, status: 'valid' },
        totalAmount: 23.67,
    };

    const appState = { order: mockOrderState };

    it('selectOrderItems returns all pizzas', () => {
        expect(selectOrderItems(appState)).toEqual([pizza1, pizza2]);
    });

    it('selectPizzaById returns the matching pizza', () => {
        expect(selectPizzaById(2)(appState)).toEqual(pizza2);
    });

    it('selectPizzaById returns undefined for an unknown id', () => {
        expect(selectPizzaById(999)(appState)).toBeUndefined();
    });

    it('selectIngredientsOfPizza returns the ingredients of an existing pizza', () => {
        expect(selectIngredientsOfPizza(1)(appState)).toEqual([ingredient]);
    });

    it('selectIngredientsOfPizza returns an empty array for an unknown pizza', () => {
        expect(selectIngredientsOfPizza(999)(appState)).toEqual([]);
    });

    it('selectOrderTotalAmount returns totalAmount', () => {
        expect(selectOrderTotalAmount(appState)).toBe(23.67);
    });

    it('selectActivePizzaId returns activePizzaId', () => {
        expect(selectActivePizzaId(appState)).toBe(1);
    });

    it('selectPromo returns the promo slice', () => {
        expect(selectPromo(appState)).toEqual(mockOrderState.promo);
    });

    it('selectDiscountAmount computes a discount when promo is valid', () => {
        expect(selectDiscountAmount(appState)).toBeCloseTo(23.67 * 0.2);
    });

    it('selectDiscountAmount is 0 when promo is not valid', () => {
        const state = { order: { ...mockOrderState, promo: { code: null, percent: 0, status: 'idle' as const } } };
        expect(selectDiscountAmount(state)).toBe(0);
    });

    it('selectFinalTotal subtracts the discount from the total', () => {
        expect(selectFinalTotal(appState)).toBeCloseTo(23.67 - 23.67 * 0.2);
    });
});