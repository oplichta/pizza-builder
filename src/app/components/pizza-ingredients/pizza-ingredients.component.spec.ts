import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PizzaIngredientsComponent } from './pizza-ingredients.component';
import { addIngredient, removeIngredient } from '../../store/order.actions';
import { selectIngredientsOfPizza } from '../../store/order.selectors';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

const initialState = { order: { items: [] } };

describe('PizzaIngredientsComponent', () => {
  let component: PizzaIngredientsComponent;
  let fixture: ComponentFixture<PizzaIngredientsComponent>;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PizzaIngredientsComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaIngredientsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    store.overrideSelector(selectIngredientsOfPizza(1), []);
    component.activePizzaId = 1;
    component.activePizzaId$ = of(1); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update ingredient on updateIngredient', () => {
    const ingredientObj = { id: 1, name: 'bacon', quantity: 1, pizzaId: 1 };
    component.updateIngredient('bacon');
    component.ingredients$ = of([]);
    fixture.detectChanges();
    component.ingredients$.subscribe(ingredients => {
      expect(ingredients).toContainEqual(ingredientObj);
    });
  });

  afterEach(() => {
    dispatchSpy.mockClear();
  });

  it('should dispatch removeIngredient if ingredient already exists', () => {
    component.activePizzaId$ = of(1);
    component.ingredients$ = of([{ id: 1, name: 'cheese', quantity: 1, pizzaId: 1 }]);

    component.updateIngredient('cheese');

    expect(dispatchSpy).toHaveBeenCalledWith(
      removeIngredient({ pizzaId: 1, ingredientId: 1 })
    );
    expect(dispatchSpy).not.toHaveBeenCalledWith(addIngredient(expect.anything()));
  });

  it('should dispatch addIngredient if ingredient does not exist', () => {
    component.activePizzaId$ = of(1);
    component.ingredients$ = of([{ id: 1, name: 'pepperoni', quantity: 1, pizzaId: 1 }]);

    component.updateIngredient('mushroom');

    // Expect addIngredient to be dispatched with new ingredient
    expect(dispatchSpy).toHaveBeenCalledWith(
      addIngredient({
        ingredient: { id: 2, name: 'mushroom', quantity: 1, pizzaId: 1 },
      })
    );
    expect(dispatchSpy).not.toHaveBeenCalledWith(removeIngredient(expect.anything()));
  });
});
