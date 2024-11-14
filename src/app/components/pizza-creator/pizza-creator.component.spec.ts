import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PizzaCreatorComponent } from './pizza-creator.component';
import { Pizza, PizzaSize } from '../../store/order.models';
import { selectActivePizzaId, selectOrderItems } from '../../store/order.selectors';
import { addPizza, removePizza, setActivePizza } from '../../store/order.actions';

describe('PizzaCreatorComponent', () => {
  let component: PizzaCreatorComponent;
  let fixture: ComponentFixture<PizzaCreatorComponent>;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaCreatorComponent],
      providers: [
        provideMockStore({ initialState: {} })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaCreatorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    store.overrideSelector(selectOrderItems, []);
    store.overrideSelector(selectActivePizzaId, 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(PizzaCreatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Choose your pizzas');
  });

  it('should add pizza on addPizza', () => {
    const pizza: Pizza = { id: 0, size: PizzaSize.Small, name: 'Pizza', price: 1, quantity: 1, ingredients: [] };
    store.overrideSelector(selectOrderItems, []);
    component.addPizza();
    expect(dispatchSpy).toHaveBeenCalledWith(addPizza({ pizza }));
    expect(dispatchSpy).toHaveBeenCalledWith(setActivePizza({ pizzaId: 0 }));
  });

  it('should remove pizza on removePizza', () => {
    const pizza: Pizza = { id: 0, size: PizzaSize.Small, name: 'Pizza', price: 1, quantity: 1, ingredients: [] };
    store.overrideSelector(selectOrderItems, [pizza]);
    component.removePizza(0);
    expect(dispatchSpy).toHaveBeenCalledWith(removePizza({ pizzaId: 0 }));
    expect(dispatchSpy).toHaveBeenCalledWith(setActivePizza({ pizzaId: 0 }));
  });

 
  it('should change active pizza on togglePizza', () => {
    const pizzas: Pizza[] = [
      { id: 0, size: PizzaSize.Small, name: 'Pizza 1', price: 1, quantity: 1, ingredients: [] },
      { id: 1, size: PizzaSize.Medium, name: 'Pizza 2', price: 2, quantity: 1, ingredients: [] },
      { id: 2, size: PizzaSize.Large, name: 'Pizza 3', price: 3, quantity: 1, ingredients: [] }
    ];
    store.overrideSelector(selectOrderItems, pizzas);
    component.togglePizza(2);
    expect(dispatchSpy).toHaveBeenCalledWith(setActivePizza({ pizzaId: 2 }));
  });
});