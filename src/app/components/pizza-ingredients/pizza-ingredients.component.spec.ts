import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PizzaIngredientsComponent } from './pizza-ingredients.component';
import { addIngredient, removeIngredient } from '../../store/order.actions';
import { initialOrderState } from '../../store/order.reducer';
import { initialState as initialIngredientState } from '../../store/ingredient.reducer';
import { Ingredient } from '../../store/ingredient.models';
import { Pizza, PizzaSize } from '../../store/order.models';

const catalogue: Ingredient[] = [
    { id: 1, name: 'cheese', pizzaId: 0, visible: true },
    { id: 2, name: 'olive', pizzaId: 0, visible: true },
    { id: 3, name: 'mushroom', pizzaId: 0, visible: true },
    { id: 4, name: 'secret-sauce', pizzaId: 0, visible: false },
];

const buildState = (selected: Ingredient[], loading = false) => {
    const pizza: Pizza = { id: 1, name: 'Pizza', price: 1, size: PizzaSize.Small, quantity: 1, selectedIngredients: selected };
    return {
        order: { ...initialOrderState, activePizzaId: 1, pizzas: [pizza] },
        ingredient: { ...initialIngredientState, ingredients: catalogue, loading },
    };
};

describe('PizzaIngredientsComponent', () => {
    let fixture: ComponentFixture<PizzaIngredientsComponent>;
    let store: MockStore;
    let dispatchSpy: jest.SpyInstance;

    const render = (selected: Ingredient[] = [], loading = false) => {
        store.setState(buildState(selected, loading));
        fixture.detectChanges();
    };

    const labels = (): HTMLElement[] => Array.from(fixture.nativeElement.querySelectorAll('label.pizza-ingredient'));
    const checkbox = (name: string): HTMLInputElement => fixture.nativeElement.querySelector(`input[value="${name}"]`);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PizzaIngredientsComponent],
            providers: [provideMockStore({ initialState: buildState([]) })],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        dispatchSpy = jest.spyOn(store, 'dispatch');
        fixture = TestBed.createComponent(PizzaIngredientsComponent);
        fixture.detectChanges();
        dispatchSpy.mockClear();
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('renders only visible ingredients', () => {
        render();
        expect(labels().map((l) => l.textContent?.trim())).toEqual(['Cheese', 'Olive', 'Mushroom']);
    });

    it('marks ingredients selected on the active pizza', () => {
        render([catalogue[0]]);
        expect(checkbox('cheese').checked).toBe(true);
        expect(checkbox('olive').checked).toBe(false);
        expect(labels()[0].classList).toContain('pizza-ingredient--active');
        expect(labels()[1].classList).not.toContain('pizza-ingredient--active');
    });

    it('shows the loader while ingredients are loading', () => {
        render([], true);
        expect(fixture.nativeElement.querySelector('app-loader')).not.toBeNull();
    });

    it('dispatches removeIngredient when clicking a selected ingredient', () => {
        render([{ id: 7, name: 'cheese', pizzaId: 1, visible: true }]);
        checkbox('cheese').click();
        expect(dispatchSpy).toHaveBeenCalledWith(removeIngredient({ pizzaId: 1, ingredientId: 7 }));
    });

    it('dispatches addIngredient when clicking an unselected ingredient', () => {
        render([{ id: 1, name: 'cheese', pizzaId: 1, visible: true }]);
        checkbox('mushroom').click();
        expect(dispatchSpy).toHaveBeenCalledWith(addIngredient({ ingredient: { id: 2, name: 'mushroom', pizzaId: 1, visible: true } }));
    });

    it('never reuses an id after a lower-id ingredient was removed', () => {
        render([
            { id: 2, name: 'olive', pizzaId: 1, visible: true },
            { id: 3, name: 'cheese', pizzaId: 1, visible: true },
        ]);
        checkbox('mushroom').click();
        expect(dispatchSpy).toHaveBeenCalledWith(addIngredient({ ingredient: { id: 4, name: 'mushroom', pizzaId: 1, visible: true } }));
    });
});
