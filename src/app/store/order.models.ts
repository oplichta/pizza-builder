export interface Pizza {
    id: number;
    name: string;
    price: number;
    quantity: number;
    items: Ingredients[];
    valid?: boolean;
}

export interface Ingredients {
    id: number;
    pizzaId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface OrderState {
    pizzas: Pizza[];
    totalAmount: number;
}
