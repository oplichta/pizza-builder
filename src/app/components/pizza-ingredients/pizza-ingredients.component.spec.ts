import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PizzaIngredientsComponent } from './pizza-ingredients.component';
import { addIngredient, removeIngredient } from '../../store/order.actions';
import { of } from 'rxjs';

const initialState = { order: { items: [] } };

describe('PizzaIngredientsComponent', () => {
  let component: PizzaIngredientsComponent;
  let fixture: ComponentFixture<PizzaIngredientsComponent>;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaIngredientsComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaIngredientsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    component.activePizzaId = 1;
    component.activePizzaId$ = of(1);
    fixture.detectChanges();
  });

  afterEach(() => {
    dispatchSpy.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate ingredients with only visible ingredient names', () => {
    component.ingredients$ = of([
      { id: 1, name: 'bacon', pizzaId: 1, visible: true },
      { id: 2, name: 'secret-sauce', pizzaId: 1, visible: false },
    ]);

    component.ngOnInit();

    expect(component.ingredients).toEqual(['bacon']);
  });

  it('should dispatch removeIngredient if ingredient already exists', () => {
    component.selectedIngredients$ = of([{ id: 1, name: 'cheese', pizzaId: 1, visible: true }]);

    component.updateIngredient('cheese');

    expect(dispatchSpy).toHaveBeenCalledWith(
      removeIngredient({ pizzaId: 1, ingredientId: 1 })
    );
    expect(dispatchSpy).not.toHaveBeenCalledWith(addIngredient(expect.anything()));
  });

  it('should dispatch addIngredient if ingredient does not exist', () => {
    component.selectedIngredients$ = of([{ id: 1, name: 'pepperoni', pizzaId: 1, visible: true }]);

    component.updateIngredient('mushroom');

    expect(dispatchSpy).toHaveBeenCalledWith(
      addIngredient({
        ingredient: { id: 2, name: 'mushroom', pizzaId: 1, visible: true },
      })
    );
    expect(dispatchSpy).not.toHaveBeenCalledWith(removeIngredient(expect.anything()));
  });
});
