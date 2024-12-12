import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { OrderSummaryComponent } from './order-summary.component';
import { Pizza, PizzaSize } from '../../store/order.models';
import { selectOrderItems, selectOrderTotalAmount } from '../../store/order.selectors';

describe('OrderSummaryComponent', () => {
    let component: OrderSummaryComponent;
    let fixture: ComponentFixture<OrderSummaryComponent>;
    let store: MockStore;

    const mockPizzas: Pizza[] = [
        { id: 1, name: 'Margherita', size: PizzaSize.Medium, ingredients: [], quantity: 1, price: 12.99 },
        { id: 2, name: 'Pepperoni', size: PizzaSize.Large, ingredients: [], quantity: 1, price: 15.99 },
    ];
    const mockTotalPrice = 28.98;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderSummaryComponent],
            providers: [
                provideMockStore({
                    selectors: [
                        { selector: selectOrderItems, value: mockPizzas },
                        { selector: selectOrderTotalAmount, value: mockTotalPrice },
                    ],
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderSummaryComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select pizzas from store and set them in pizzas$', (done) => {
        component.pizzas$.subscribe((pizzas) => {
            expect(pizzas).toEqual(mockPizzas);
            done();
        });
    });

    it('should select total price from store and set it in totalPrice$', (done) => {
        component.totalPrice$.subscribe((totalPrice) => {
            expect(totalPrice).toBe(mockTotalPrice);
            done();
        });
    });

    it('should emit goToOrderForm when goToForm is called', () => {
        const emitSpy = jest.spyOn(component.goToOrderForm, 'emit');

        component.goToForm();

        expect(emitSpy).toHaveBeenCalled();
        expect(emitSpy).toHaveBeenCalledWith(); // Check if emitted without parameters
    });
});
