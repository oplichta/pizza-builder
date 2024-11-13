import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PizzaSizeComponent } from './pizza-size.component';
import { updatePizzaSize } from '../../store/order.actions';
import { selectOrderItems } from '../../store/order.selectors';
import { PizzaSize } from '../../store/order.models';
import { CommonModule } from '@angular/common';

const initialState = { order: { items: [] } };

describe('PizzaSizeComponent', () => {
  let component: PizzaSizeComponent;
  let fixture: ComponentFixture<PizzaSizeComponent>;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PizzaSizeComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaSizeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    store.overrideSelector(selectOrderItems, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sizes', () => {
    expect(component.sizes.length).toBe(3);
    expect(component.sizes).toEqual([
      { type: PizzaSize.Small, centimeters: 30 },
      { type: PizzaSize.Medium, centimeters: 40 },
      { type: PizzaSize.Large, centimeters: 50 }
    ]);
  });

  it('should update size on onChange', () => {
    component.onChange(PizzaSize.Large);
    expect(component.value).toBe(PizzaSize.Large);
    expect(dispatchSpy).toHaveBeenCalledWith(updatePizzaSize({ size: PizzaSize.Large }));
  });

  it('should update focused size on onFocus', () => {
    component.onFocus(PizzaSize.Medium);
    expect(component.focused).toBe(PizzaSize.Medium);
  });
});
