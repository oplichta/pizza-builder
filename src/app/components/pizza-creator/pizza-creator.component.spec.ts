import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PizzaCreatorComponent } from './pizza-creator.component';
import { Pizza, PizzaSize } from '../../store/order.models';
import { of } from 'rxjs';

describe('PizzaCreatorComponent', () => {
  let component: PizzaCreatorComponent;
  let fixture: ComponentFixture<PizzaCreatorComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaCreatorComponent],
      providers: [
        provideMockStore({ initialState: {} })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaCreatorComponent);
    component = fixture.componentInstance;
    component.activePizzaId$ = of(1);
    store = TestBed.inject(MockStore);
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
    const pizza: Pizza = { id: 1, size: PizzaSize.Small, name: 'Pizza', price: 1, quantity: 1, ingredients: [] };
    component.addPizza();
    component.pizzas$ = of([]);
    fixture.detectChanges();
    component.pizzas$.subscribe(pizzas => {
      expect(pizzas).toContainEqual(pizza);
    });
  });
 
  it('should change active pizza on togglePizza', () => {
    component.togglePizza(2);
    fixture.detectChanges();
    component.activePizzaId$.subscribe(pizzaId => {
      expect(pizzaId).toEqual(2);
    });
  });
});