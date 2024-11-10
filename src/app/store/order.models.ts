
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
    ingredients: Ingredient[];
    valid?: boolean;
}

export interface Ingredient {
    id: number;
    pizzaId: number;
    name: string;
    quantity: number;
}

export interface OrderState {
    pizzas: Pizza[];
    activePizzaId: number;
    totalAmount: number;
}
