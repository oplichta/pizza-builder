import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { OrderComponent } from './order.component';
import { initialOrderState } from '../store/order.reducer';

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderComponent],
            providers: [
                // Stan mocka musi miec ksztalt prawdziwego stanu - inaczej kazdy selektor
                // siegajacy po state.order wywala sie na undefined.
                provideMockStore({ initialState: { order: initialOrderState } }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
