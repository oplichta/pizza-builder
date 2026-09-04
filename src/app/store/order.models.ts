import { Ingredient } from "./ingredient.models";

export enum PizzaSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
  }
  
export interface Pizza {
    id: number;
    name: string;
    price: number;
    size: PizzaSize;
    quantity: number;
    selectedIngredients: Ingredient[];
    valid?: boolean;
}

export interface OrderState {
    pizzas: Pizza[];
    activePizzaId: number;
    promo: PromoState;
    totalAmount: number;
}

export interface PromoState {
    code: string | null;
    percent: number;
    status: 'idle' | 'checking' | 'valid' | 'invalid';
}
