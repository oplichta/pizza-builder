import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PizzaSizeComponent } from './pizza-size.component';
import { PizzaSize } from '../../store/order.models';

describe('PizzaSizeComponent', () => {
  let component: PizzaSizeComponent;
  let fixture: ComponentFixture<PizzaSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSizeComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaSizeComponent);
    component = fixture.componentInstance;
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

  it('should update value and notify the registered onChange callback', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    component.onChangeSize(PizzaSize.Large);

    expect(component.value).toBe(PizzaSize.Large);
    expect(onChangeSpy).toHaveBeenCalledWith(PizzaSize.Large);
  });

  it('should notify the registered onTouched callback on change', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);

    component.onChangeSize(PizzaSize.Medium);

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should write a value via writeValue', () => {
    component.writeValue(PizzaSize.Large);

    expect(component.value).toBe(PizzaSize.Large);
  });
});
